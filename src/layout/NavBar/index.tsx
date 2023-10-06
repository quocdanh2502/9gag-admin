"use client";

import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useAppSelector } from "@/redux/hook";

const { Sider } = Layout;

const AppNavBar: React.FC = () => {
  const collapsed = useAppSelector((state) => state.change.isOpen);
  const mode = useAppSelector((state) => state.switch.mode);

  return (
    <Sider
      trigger={null}
      collapsedWidth="50"
      collapsible
      collapsed={collapsed}
      theme={mode === "dark" ? "dark" : "light"}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme={mode === "dark" ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      />
    </Sider>
  );
};

export default AppNavBar;
