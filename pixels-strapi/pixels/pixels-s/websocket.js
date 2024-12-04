const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

try {
  const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
      transports: ['websocket']
    },
    path: '/ws'
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle joining canvas room
    socket.on('join_canvas', (canvasId) => {
      socket.join(`canvas_${canvasId}`);
      console.log(`Client joined canvas: ${canvasId}`);
    });

    // Handle leaving canvas room
    socket.on('leave_canvas', (canvasId) => {
      socket.leave(`canvas_${canvasId}`);
      console.log(`Client left canvas: ${canvasId}`);
    });

    // Handle pixel updates
    socket.on('pixel_update', ({ canvasId }) => {
      // Broadcast to all clients in this canvas room EXCEPT sender
      socket.to(`canvas_${canvasId}`).emit('pixel_updated');
      console.log(`Pixel updated in canvas: ${canvasId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  const PORT = process.env.WS_PORT || 2929;
  server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
  });

} catch (error) {
  console.error('Failed to start WebSocket server:', error);
}