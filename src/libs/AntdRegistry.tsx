"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";
import { darkTheme, lightTheme } from "@/styles/theme";
import { useAppSelector } from "@/hooks/redux-toolkit";

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const mode = useAppSelector((state) => state.switch.mode);

  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
