"use client";

//Not me
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";

//My file
import styles from "./Login.module.css";
import { Auth } from "@/models/auth";
import authApi from "@/services/api/signIn";
import { setCookie } from "@/utils/cookie";
import { useMutation } from "@/hooks/swr";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { changeAuthenticate } from "@/redux/Slice/authenticate";
import { setUser } from "@/redux/Slice/user";
import userApi from "@/services/api/user";

const SignInForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = useMutation(
    "login",
    async (key, data) => {
      setIsLoading(true);
      const resToken = await authApi.postAuthSignIn(
        data.arg as unknown as Auth
      );
      setCookie("token", resToken.data.token, 86400 * 7);
    },
    {
      onSuccess: async () => {
        const resProfile = await userApi.getProfile();
        dispatch(changeAuthenticate(true));
        dispatch(setUser(resProfile.data));
        setIsLoading(false);
        router.push("/dashboard");
      },
      onError: (err: Error) => {
        setIsLoading(false);
        messageApi.error("Login error");
      },
    }
  );
  return (
    <>
      {contextHolder}
      <Spin spinning={isLoading}>
        <div className={styles["wrapper-login"]}>
          <header className={styles["header"]}>Sign In</header>
          <Form
            layout="vertical"
            name="basic"
            style={{ width: 300 }}
            initialValues={{ remember: true }}
            onFinish={login.trigger}
            autoComplete="on"
          >
            <Form.Item<Auth>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Auth>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<Auth> name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </>
  );
};

export default SignInForm;
