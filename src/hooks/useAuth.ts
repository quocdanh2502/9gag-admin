import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { deleteCookie } from "@/utils/cookie";
import { useAppDispatch, useAppSelector } from "./redux-toolkit";
import { changeAuthenticate } from "@/redux/Slice/authenticate";
import { useMutation } from "./swr";
import userApi from "@/services/api/user";
import { setUser } from "@/redux/Slice/user";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useCallback(() => {
    dispatch(changeAuthenticate(false));
    deleteCookie("token");
    router.push("/");
  }, [dispatch, router]);
};

export const useGetProfile = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const login = useMutation(
    "login",
    async () => {
      const resProfile = await userApi.getProfile();
      return resProfile.data;
    },
    {
      onSuccess: (data) => {
        dispatch(changeAuthenticate(true));
        dispatch(setUser(data));
      },
      onError: (err: Error) => {
        if (err.message) console.log("Bạn chưa đăng nhập", err.message);
      },
    }
  );

  if (!isAuthenticated) {
    login.trigger();
  }
  return isAuthenticated;
};
