import axiosClient from "@/services/axiosClient";
import { Avatar, User } from "@/models/user";
import { Token } from "@/models/auth";

interface UploadProps {
  file: File;
}

const endpoint = {
  user: "user",
  upload: "upload",
  profile: "user/profile",
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
    console.log(params);
    return axiosClient.put<Token>(endpoint.profile, params);
  },
};

export default userApi;
