import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface NavBarState {
  isOpen: boolean;
}

const initialState: NavBarState = {
  isOpen: true,
};

export const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    change: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

const navBarReducer = navBarSlice.reducer;

export const { change } = navBarSlice.actions;

export const changeState = (state: RootState) => state.change.isOpen;

export default navBarReducer;
