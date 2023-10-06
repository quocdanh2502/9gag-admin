import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

import { Auth, Token } from "@/models/auth";

interface authState {
  isLoading: boolean;
  isError: boolean | null;
  token: string;
}

const initialState: authState = {
  isLoading: false,
  isError: null,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, actions: PayloadAction<Auth>) => {
      state.isLoading = true;
    },
    signInSuccess: (state, actions: PayloadAction<Token>) => {
      state.isLoading = false;
      state.isError = null;
      state.token = actions.payload.token;
    },
    signInError: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
    },
    signOut: (state, actions: PayloadAction<string>) => {
      state.token = actions.payload;
    },
  },
});

const authReducer = authSlice.reducer;

export const { signIn, signInSuccess, signInError, signOut } =
  authSlice.actions;

export const authState = (state: RootState) => state.auth;

export default authReducer;
