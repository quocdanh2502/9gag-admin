import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface HeaderState {
  isAuthenticated: boolean;
}

const initialState: HeaderState = {
  isAuthenticated: false,
};

export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    changeAuthenticate: (state, actions) => {
      state.isAuthenticated = actions.payload;
    },
  },
});

const authenticateReducer = authenticateSlice.reducer;

export const { changeAuthenticate } = authenticateSlice.actions;

export default authenticateReducer;
