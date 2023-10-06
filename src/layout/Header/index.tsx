"use client";

import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { change } from "@/redux/Slice/navBar";
import { switchMode } from "@/redux/Slice/header";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const collapsed = useAppSelector((state) => state.change.isOpen);
  const mode = useAppSelector((state) => state.switch.mode);
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: mode === "dark" ? "#001529" : colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(change())}
        style={{
          color:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.65)"
              : "rgba(0, 0, 0, 0.88)",
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Switch
        checked={mode === "dark"}
        onChange={() => dispatch(switchMode())}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </Header>
  );
};

export default AppHeader;
