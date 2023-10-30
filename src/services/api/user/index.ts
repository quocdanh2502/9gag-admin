import axiosClient from "@/services/axiosClient";
import { Avatar, User } from "@/models/user";

const userApi = {
  getProfile() {
    const url = `user`;
    return axiosClient.get<User>(url);
  },
  postAvatar() {
    const url = `upload`;
    return axiosClient.post<Avatar>(url);
  },
};

export default userApi;
