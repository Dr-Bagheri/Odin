import React from 'react';
import { GitHubBanner, Refine, Authenticated } from "@refinedev/core";
import { useNotificationProvider, ErrorComponent } from "@refinedev/antd";
import { DataProvider } from "@refinedev/strapi-v4";
import routerBindings, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import axios from "axios";

import { Layout } from "./components/layout";
import { CanvasFeaturedList, CanvasList, CanvasShow } from "./pages/canvases";
import { AuthPage } from "./pages/auth";
import { authProvider } from "./providers";

import "@refinedev/antd/dist/reset.css";
import "./styles/style.css";

import axiosInstance from './axiosInstance';

const API_URL = "http://localhost:3000/api";
const TOKEN_KEY = "f4a42d3145e9c7c09f69a4f6e22d8dfe47597ceb8b763db55dcc7515aeade3a61e278f6106d1e570607a9e43df8c3c651671ac2e1776c05468c7b301a4295c158a9f898641df17de79b872e55db17228009d5dd8a6bdbed67fc8dacc05cb2c3697205115b91cb66e7504a1829c38a7d2d3de6cb4d886fb33801cc7965c1b359b";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3ecf8e",
            colorText: "#80808a",
            colorError: "#fa541c",
            colorBgLayout: "#f0f2f5",
            colorLink: "#3ecf8e",
            colorLinkActive: "#3ecf8e",
            colorLinkHover: "#3ecf8e",
          },
        }}
      >
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={DataProvider(API_URL, axiosInstance)}
            //auditLogProvider={auditLogProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "canvases",
                list: "/canvases",
                show: "/canvases/show/:id",
              },
            ]}
            notificationProvider={useNotificationProvider}
          >
            <Routes>
              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route index element={<CanvasFeaturedList />} />

                <Route path="/canvases">
                  <Route index element={<CanvasList />} />
                  <Route path="show/:id" element={<CanvasShow />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<Outlet />}
                  >
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      providers={[
                        {
                          name: "github",
                          icon: (
                            <GithubOutlined
                              style={{
                                fontSize: "18px",
                              }}
                            />
                          ),
                          label: "Sign in with GitHub",
                        },
                      ]}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" />}
                />
              </Route>

              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
