import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/models/user";

type UserState = User;

const initialState: UserState = {
  username: "",
  displayName: "",
  avatarUrl: "",
  coverImgUrl: "",
  id: 0,
  country: "",
  created: "",
  about: "",
  isPrivate: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<User>) => {
      return {
        ...state,
        ...actions.payload,
      };
    },
  },
});

const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;

export default userReducer;
