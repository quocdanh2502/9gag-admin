"use client";

import React, { useEffect } from "react";
import { Layout } from "antd";

import styles from "./page.module.css";
import FormLogin from "@/components/SignInForm";
import { useGetProfile } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const { Content } = Layout;

const SignIn: React.FC = () => {
  const router = useRouter();

  const isAuthenticated = useGetProfile();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
      }}>
      <Content
        style={{ width: "50%", height: "100vh" }}
        className={styles["bg"]}></Content>
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
        }}>
        <FormLogin />
      </Content>
    </Layout>
  );
};

export default SignIn;
