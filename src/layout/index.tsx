"use client";

import React from "react";
import { Layout, theme } from "antd";

import AppNavBar from "./NavBar";
import AppHeader from "./Header";

const { Content } = Layout;

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <AppNavBar />
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
