import axiosClient from "@/services/axiosClient";
import { AllUsers, Avatar, FieldType, User } from "@/models/user";
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
  block: "user/suspend",
  unblock: "user/unsuspend",
  deleteAdmin: "user/admin/delete",
  addAdmin: "user/admin/add",
  suspended: "user/suspended/list",
  all: "user/all",
  admins: "user/admins",
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
  blockUser(params: number) {
    return axiosClient.put<Token>(endpoint.block + `/${params}`);
  },
  unblockUser(params: number) {
    return axiosClient.put<Token>(endpoint.unblock + `/${params}`);
  },

  getAllUsers(params: AllUsersProps) {
    return axiosClient.get<AllUsers>(endpoint.all, { params });
  },
  getListAdmin(params: AllUsersProps) {
    return axiosClient.get<AllUsers>(endpoint.admins, { params });
  },
  getListUserSuspend(params: AllUsersProps) {
    return axiosClient.get<AllUsers>(endpoint.suspended, { params });
  },
  deleteAdmin(params: number) {
    return axiosClient.put<Token>(endpoint.deleteAdmin + `/${params}`);
  },
  addAdmin(params: FieldType) {
    return axiosClient.post<Token>(endpoint.addAdmin,  params );
  },
};

export default userApi;
