"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Layout } from "antd";

import styles from "./page.module.css";
import FormLogin from "@/components/SignInForm";
import { useSession } from "next-auth/react";

const { Content } = Layout;

const Login: React.FC = () => {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  return (
    <Layout
      style={{ display: "flex", flexDirection: "row", backgroundColor: "#fff" }}
    >
      <Content
        style={{ width: "50%", height: "100vh" }}
        className={styles["bg"]}
      ></Content>
      <Content
        className={styles["logo"]}
        style={{
          width: "50%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <FormLogin />
      </Content>
    </Layout>
  );
};

export default Login;
