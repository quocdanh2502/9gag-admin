"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Flex,
  Button,
  Pagination,
  Space,
  PaginationProps,
  notification,
  Modal,
  Form,
  FormProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

import { useAppDispatch } from "@/hooks/redux-toolkit";
import { selectKey } from "@/redux/Slice/navBar";
import { KEY_NAVBAR } from "@/config/constant";
import { FieldType, User } from "@/models/user";
import { useQuery } from "@/hooks/swr";
import userApi from "@/services/api/user";
import styles from "./Admin.module.scss";

const { Search } = Input;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    delete values.confirmPassword;
    const data = await userApi.addAdmin(values);
    console.log(data);
    if (data.status === 201) {
      api["success"]({
        message: "SUCCESS",
        description: "Add admin successfully",
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const validateConfirmPassword = (_: any, value: string) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Passwords do not match!"));
  };

  const columns: ColumnsType<User> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "address",
    },
    {
      title: "Displayname",
      dataIndex: "displayName",
      key: "displayname",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Action",
      dataIndex: "displayName",
      key: "action",
      render: (value: any, record: User, index: any) => {
        return (
          <Button
            type="primary"
            ghost
            onClick={() => handleActionBlock(record.id, "delete")}>
            Delete
          </Button>
        );
      },
    },
  ];

  const handleActionBlock = async (id: number, type: string) => {
    if (type === "delete") {
      if (window.confirm("Are you sure you want to delete this admin?")) {
        const data = await userApi.deleteAdmin(id);
        console.log(data);
        if (data.status === 204) {
          api["success"]({
            message: "SUCCESS",
            description: "Unblocked user successfully",
          });
        }
      }
    } else {
      if (window.confirm("Are you sure you want to unblock this user?")) {
        const data = await userApi.unblockUser(id);
        console.log(data);
        if (data.status === 204) {
          api["success"]({
            message: "SUCCESS",
            description: "Unblocked user successfully",
          });
        }
      }
    }
  };

  const { data, error, isLoading, mutate } = useQuery(
    "get-list-user-suspend",
    () => userApi.getListAdmin({ page: 0, size: 20, search: "" })
  );

  useEffect(() => {
    if (data) {
      setTotalPages(data?.data.totalPages);
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    dispatch(selectKey(KEY_NAVBAR.dashboard.key));
  }, [dispatch]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    setTableParams({
      pagination,
      filters,
    });
  };

  const handlePagination: PaginationProps["onChange"] = async (current) => {
    const data = await userApi.getAllUsers({
      page: current - 1,
      size: 20,
      search: "",
    });
    if (data?.status === 200) {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      mutate(data, false);
    }
  };

  // console.log(data, totalPages);

  return (
    <>
      {contextHolder}
      <Flex gap="middle" vertical>
        <Flex justify="space-between" align="center">
          <Search
            placeholder="Input search text"
            allowClear
            enterButton="Search"
            size="middle"
            style={{ width: "25%", minWidth: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size={"large"}
            onClick={showModal}>
            Add
          </Button>
        </Flex>
        <Table
          dataSource={data?.data.content}
          columns={columns}
          pagination={false}
          loading={isLoading}
          onChange={handleTableChange}
          scroll={{ x: "100%", y: 500 }}
        />
        <Space style={{ display: "flex", justifyContent: "end" }}>
          {totalPages && (
            <Pagination
              defaultCurrent={1}
              onChange={handlePagination}
              total={totalPages * 10}
            />
          )}
        </Space>
      </Flex>
      <Modal
        title="Add Admin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item<string>
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              { validator: validateConfirmPassword },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="Display Name"
            name="displayName"
            rules={[
              { required: true, message: "Please input your display name!" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Admin;
