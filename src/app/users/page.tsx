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
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

import { useAppDispatch } from "@/hooks/redux-toolkit";
import { selectKey } from "@/redux/Slice/navBar";
import { KEY_NAVBAR } from "@/config/constant";
import { User } from "@/models/user";
import { useQuery } from "@/hooks/swr";
import userApi from "@/services/api/user";
import styles from "./Use.module.scss";

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

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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
            onClick={() => handleActionBlock(record.id, "block")}>
            Block
          </Button>
        );
      },
    },
  ];

  const handleActionBlock = async (id: number, type: string) => {
    if (type === "block") {
      if (window.confirm("Are you sure you want to block this user?")) {
        const data = await userApi.blockUser(id);
        console.log(data);
        if (data.status === 204) {
          api["success"]({
            message: "SUCCESS",
            description: "Blocked user successfully",
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

  const { data, error, isLoading, mutate } = useQuery("get-all-user", () =>
    userApi.getAllUsers({ page: 0, size: 20, search: "" })
  );

  useEffect(() => {
    if (data) {
      setTotalPages(data?.data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    dispatch(selectKey(KEY_NAVBAR.users.key));
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
        <Search
          placeholder="Input search text"
          allowClear
          enterButton="Search"
          size="middle"
          style={{ width: "25%", minWidth: 300 }}
        />
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
    </>
  );
};

export default Users;
