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
      onClick: () => handleNavigate("/dashboard"),
    },
    {
      key: KEY_NAVBAR.users.key,
      icon: <UserOutlined style={{ fontSize: "18px" }} />,
      label: KEY_NAVBAR.users.label,
      onClick: () => handleNavigate("/users"),
    },
    {
      key: KEY_NAVBAR.root.key,
      icon: <TeamOutlined style={{ fontSize: "18px" }} />,
      label: KEY_NAVBAR.root.label,
      onClick: () => handleNavigate("/root"),
    },
  ];

  return (
    <Sider
      theme={mode === "dark" ? "dark" : "light"}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
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
