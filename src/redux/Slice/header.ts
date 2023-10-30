import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface HeaderState {
  mode: string;
}

const initialState: HeaderState = {
  mode: "light",
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    switchMode: (state) => {
      state.mode == "dark" ? (state.mode = "light") : (state.mode = "dark");
    },
  },
});

const headerReducer = headerSlice.reducer;

export const { switchMode } = headerSlice.actions;

export const changeState = (state: RootState) => state.switch.mode;

export default headerReducer;
