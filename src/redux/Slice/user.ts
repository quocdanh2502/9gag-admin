import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { User } from "@/models/user";

type UserState = User;

const initialState: UserState = {
  username: "",
  displayName: "",
  avatarUrl: "",
  id: 0,
  country: "",
  created: "",
  about: "",
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

export const changeState = (state: RootState) => state.switch.mode;

export default userReducer;
