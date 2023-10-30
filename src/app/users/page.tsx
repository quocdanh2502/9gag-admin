"use client";

import React, { useEffect } from "react";
import {} from "antd";
import {} from "@ant-design/icons";

import { useAppDispatch } from "@/hooks/redux-toolkit";
import { selectKey } from "@/redux/Slice/navBar";
import { KEY_NAVBAR } from "@/config/constant";
import styles from "./Profile.module.scss";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectKey(KEY_NAVBAR.users.key));
  }, [dispatch]);

  return <>User</>;
};

export default Users;
