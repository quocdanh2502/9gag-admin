'use client'

//Not me
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button, Checkbox, Form, Input, message, Spin } from 'antd'

//My file
import styles from './Login.module.css'
import { Auth } from '@/models/auth'
import authApi from '@/services/api/login'
import { setCookie } from '@/utils'
import { useMutation } from '@/hooks/swr'
import { useRouter } from 'next/navigation'

const SignInForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const router = useRouter()
  const login = useMutation(
    'login',
    async (key, data) => {
      const res = await authApi.postAuthLogin(data.arg as unknown as Auth)
      setCookie('token', res.data.token, 86400 * 7)
    },
    {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (err) => {
        messageApi.error(err?.message ?? 'Login error')
      },
    }
  )
  return (
    <>
      {contextHolder}
      <Spin spinning={isLoading}>
        <div className={styles['wrapper-login']}>
          <header className={styles['header']}>Sign In</header>
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
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Auth>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
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
  )
}

export default SignInForm
