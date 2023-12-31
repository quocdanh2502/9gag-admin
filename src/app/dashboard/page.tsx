"use client";

import React, { useEffect } from "react";

import { useAppDispatch } from "@/hooks/redux-toolkit";
import { selectKey } from "@/redux/Slice/navBar";
import { KEY_NAVBAR } from "@/config/constant";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectKey(KEY_NAVBAR.dashboard.key));
  }, [dispatch]);

  return (
    <>
      <div>User</div>
    </>
  );
};

export default Dashboard;
