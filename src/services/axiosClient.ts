import axios from "axios";
import { URL_API } from "@/config/config";
import { getCookie } from "@/utils/cookie";

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      typeof window !== "undefined" ? `Bearer ${getCookie("token")}` : "";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
