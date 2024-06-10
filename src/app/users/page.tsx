"use client";

import React, { useEffect, useState } from "react";
import { Table, Input, Flex } from "antd";
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

const columns: ColumnsType<User> = [
  {
    title: "Id",
    dataIndex: "Id",
    key: "id",
    width: "30%",
  },
  {
    title: "Username",
    dataIndex: "Username",
    key: "address",
  },
  {
    title: "Displayname",
    dataIndex: "Displayname",
    key: "displayname",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, error, isLoading } = useQuery("get-all-user", () =>
    userApi.getAllUsers({ page: 1, size: 10, search: "" })
  );

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

  console.log(data);

  return (
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
        pagination={tableParams.pagination}
        loading={isLoading}
        onChange={handleTableChange}
        scroll={{ x: "100%", y: 500 }}
      />
    </Flex>
  );
};

export default Users;
