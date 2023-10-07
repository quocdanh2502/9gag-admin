"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import DefaultLayout from "@/layout";

const Dashboard: React.FC = () => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status, router]);

  return (
    <DefaultLayout>
      <div>Hello</div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        logout
      </button>
    </DefaultLayout>
  );
};

export default Dashboard;
