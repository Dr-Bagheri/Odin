import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import {
  useCreate,
  useGetIdentity,
  useNavigation,
  useShow,
  useParsed,
  useIsAuthenticated,
  useList,
} from "@refinedev/core";
import { useModal } from "@refinedev/antd";

import { LeftOutlined } from "@ant-design/icons";
import { Button, Typography, Spin, Modal } from "antd";

import { CanvasItem, DisplayCanvas } from "../../components/canvas";
import { ColorSelect } from "../../components/color-select";
import { AvatarPanel } from "../../components/avatar";
import type { colors } from "../../utility";
import type { Canvas } from "../../types/canvas";
import type { Pixel, PixelChange, LiveEvent } from "../../types";
import { LogList } from "../../components/logs";

const { Title } = Typography;

type Colors = typeof colors;

export const CanvasShow: React.FC = () => {
  const { pathname } = useParsed();
  const [color, setColor] = useState<Colors[number]>("black");
  const { modalProps, show, close } = useModal();
  const { data: identity } = useGetIdentity<any>();
  const {
    data: { authenticated } = {},
  } = useIsAuthenticated();

  const {
    query: {
      data: { data: canvas } = {},
    },
  } = useShow<Canvas>();
  const { mutate } = useCreate({
    resource: "pixels",
    successNotification: false,
    meta: {
      canvas,
    },
  });
  const { list, push } = useNavigation();

  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const { data: pixelsData } = useList<Pixel>({
    resource: "pixels",
    filters: [
      {
        field: "canvas_id",
        operator: "eq",
        value: canvas?.id,
      },
    ],
    queryOptions: {
      enabled: !!canvas?.id,
    },
  });

  useEffect(() => {
    if (!canvas?.id) return;

    // Connect to WebSocket server
    socketRef.current = io('http://localhost:2929', {
      path: '/ws',
      transports: ['websocket']
    });

    // Join canvas-specific room
    socketRef.current.emit('join_canvas', canvas.id);

    // Listen for pixel updates in this canvas
    socketRef.current.on('pixel_updated', () => {
      window.location.reload(); // Force refresh when any pixel is updated
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leave_canvas', canvas.id);
        socketRef.current.disconnect();
      }
    };
  }, [canvas?.id]); // Reconnect when canvas changes

  const pixels = pixelsData?.data || [];

  const onSubmit = (x: number, y: number) => {
    if (!authenticated || !identity?.id) return;

    if (typeof x === "number" && typeof y === "number" && canvas?.id) {
      const pixelData = {
        x,
        y,
        color,
        canvas_id: String(canvas.id),
        user_id: String(identity.id)
      };

      mutate({
        values: pixelData,
        successNotification: false,
      }, {
        onSuccess: () => {
          // Notify all clients viewing this canvas about the update
          socketRef.current?.emit('pixel_update', { canvasId: canvas.id });
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="paper">
        <div className="paper-header">
          <Button
            type="text"
            onClick={() => list("canvases")}
            style={{ textTransform: "uppercase" }}
          >
            <LeftOutlined />
            Back
          </Button>
          <Title level={3}>{canvas?.name ?? "Unnamed Canvas"}</Title>
          <Button type="primary" onClick={show}>
            View Changes
          </Button>
        </div>
        <Modal
          title="Canvas Changes"
          {...modalProps}
          centered
          destroyOnClose
          onOk={close}
          onCancel={() => {
            close();
          }}
          footer={[
            <Button type="primary" key="close" onClick={close}>
              Close
            </Button>,
          ]}
        >
          <LogList currentCanvas={canvas} />
        </Modal>

        {canvas ? (
          <DisplayCanvas canvas={canvas}>
            {(pixels) =>
              pixels ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 48,
                  }}
                >
                  <div>
                    <ColorSelect selected={color} onChange={setColor} />
                  </div>
                  <CanvasItem
                    canvas={canvas}
                    pixels={pixels}
                    onPixelClick={onSubmit}
                    scale={(20 / (canvas?.width ?? 20)) * 2}
                    active={true}
                  />
                  <div style={{ width: 120 }}>
                    <AvatarPanel pixels={pixels} />
                  </div>
                </div>
              ) : (
                <div className="spin-wrapper">
                  <Spin />
                </div>
              )
            }
          </DisplayCanvas>
        ) : (
          <div className="spin-wrapper">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
