import axiosClient from "@/services/axiosClient";
import { AllUsers, Avatar, User } from "@/models/user";
import { Token } from "@/models/auth";

interface UploadProps {
  file: File;
}

interface AllUsersProps {
  page: number;
  size: number;
  search: string;
}

const endpoint = {
  user: "user",
  upload: "upload",
  profile: "user/profile",
  all: "user/all",
};

const userApi = {
  getProfile() {
    return axiosClient.get<User>(endpoint.user);
  },

  postAvatar(params: UploadProps) {
    const formData = new FormData();
    formData.append("file", params.file);
    return axiosClient.post<Avatar>(endpoint.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateUser(params: User) {
    return axiosClient.put<Token>(endpoint.profile, params);
  },

  getAllUsers(params: AllUsersProps) {
    return axiosClient.get<AllUsers>(endpoint.all, { params });
  },
};

export default userApi;
