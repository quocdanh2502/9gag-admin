"use client";

import { message } from "antd";

export const RenderError = ({ res }: any) => {
  const [messageApi, contextHolder] = message.useMessage();

  if (!res?.ok) {
    messageApi.open({
      type: "error",
      content: "Username or password not true!",
    });
  }

  return contextHolder;
};
