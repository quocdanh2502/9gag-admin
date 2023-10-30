import axiosClient from "@/services/axiosClient";
import { Auth, Token } from "@/models/auth";

const authApi = {
  postAuthSignIn(params: Auth) {
    const url = `auth/login`;
    return axiosClient.post<Token>(url, params);
  },
};

export default authApi;
