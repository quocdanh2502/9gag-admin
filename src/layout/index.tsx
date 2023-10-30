"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout, theme } from "antd";

import AppNavBar from "./NavBar";
import AppHeader from "./Header";
import { useGetProfile } from "@/hooks/useAuth";

const { Content } = Layout;

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const isAuthenticated = useGetProfile();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? (
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
  ) : (
    <>{children}</>
  );
};

export default DefaultLayout;
