"use client";

import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  theme,
  Switch,
  Badge,
  Avatar,
  Flex,
  MenuProps,
  Dropdown,
} from "antd";
import {
  NotificationOutlined,
  MailOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { switchMode } from "@/redux/Slice/header";
import { KEY_SETTINGS } from "@/config/constant";
import { useSignOut } from "@/hooks/useAuth";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const router = useRouter();
  const mode = useAppSelector((state) => state.switch.mode);
  const user = useAppSelector((state) => state.user);
  const signOut = useSignOut();

  const items: MenuProps["items"] = [
    {
      label: KEY_SETTINGS.profile.label,
      key: KEY_SETTINGS.profile.key,
      icon: <ProfileOutlined />,
      onClick: () => router.push("/profile"),
    },
    {
      type: "divider",
    },
    {
      label: KEY_SETTINGS["sign-out"].label,
      key: KEY_SETTINGS["sign-out"].key,
      icon: <LogoutOutlined />,
      onClick: () => signOut(),
    },
  ];

  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: mode === "dark" ? "#001529" : colorBgContainer,
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 24,
      }}
    >
      <Flex align="center" gap={16}>
        <Switch
          checked={mode === "dark"}
          onChange={() => dispatch(switchMode())}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Badge count={5} offset={[4, 0]} size="small">
          <NotificationOutlined
            className={`${styles["icon"]} ${
              mode === "dark"
                ? styles["dark-icon-color"]
                : styles["light-icon-color"]
            }`}
          />
        </Badge>
        <Badge count={5} offset={[4, 0]} size="small">
          <MailOutlined
            className={`${styles["icon"]} ${
              mode === "dark"
                ? styles["dark-icon-color"]
                : styles["light-icon-color"]
            }`}
          />
        </Badge>
        <Flex gap={12} align="center">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar
              size={36}
              style={{ backgroundColor: "#87d068", cursor: "pointer" }}
              src={user.avatarUrl}
            />
          </Dropdown>
          <Flex
            align="start"
            justify="center"
            vertical
            style={{ height: "100%", lineHeight: "normal" }}
          >
            <p
              className={`${styles["user-name"]} ${
                mode === "dark" ? styles["dark-user-name"] : ""
              }`}
            >
              {user.displayName}
            </p>
            <p
              className={`${styles["role"]} ${
                mode === "dark" ? styles["dark-role"] : ""
              }`}
            >
              {user.username}
            </p>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
};

export default AppHeader;
