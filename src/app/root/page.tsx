"use client";

import React, { useEffect } from "react";

import { useAppDispatch } from "@/hooks/redux-toolkit";
import { selectKey } from "@/redux/Slice/navBar";
import { KEY_NAVBAR } from "@/config/constant";

const Root: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectKey(KEY_NAVBAR.root.key));
  }, [dispatch]);

  return (
    <>
      <div>Root</div>
    </>
  );
};

export default Root;
