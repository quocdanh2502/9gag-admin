"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import { useAppSelector } from "@/hooks/redux-toolkit";
import { KEY_NAVBAR } from "@/config/constant";
import styles from "./NavBar.module.scss";

const { Sider } = Layout;

const AppNavBar: React.FC = () => {
  const router = useRouter();
  const { key } = useAppSelector((state) => state.change);
  const mode = useAppSelector((state) => state.switch.mode);
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const items = [
    {
      key: KEY_NAVBAR.dashboard.key,
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
      label: KEY_NAVBAR.dashboard.label,
      onClick: () => handleNavigate("/admin"),
    },
    {
      key: KEY_NAVBAR.users.key,
      icon: <UserOutlined style={{ fontSize: "18px" }} />,
      label: KEY_NAVBAR.users.label,
      onClick: () => handleNavigate("/users"),
    },
    {
      key: KEY_NAVBAR.reports.key,
      icon: <TeamOutlined style={{ fontSize: "18px" }} />,
      label: KEY_NAVBAR.reports.label,
      onClick: () => handleNavigate("/reports"),
    },
  ];

  return (
    <Sider
      theme={mode === "dark" ? "dark" : "light"}
      collapsible
      collapsed={collapsed}
      trigger={null}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 9999,
      }}>
      <div className="demo-logo-vertical" />
      <Menu
        theme={mode === "dark" ? "dark" : "light"}
        mode="inline"
        selectedKeys={[key]}
        items={items}
      />
    </Sider>
  );
};

export default AppNavBar;
