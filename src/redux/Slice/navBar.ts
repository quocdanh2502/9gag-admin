import { createSlice } from "@reduxjs/toolkit";

import { KEY_NAVBAR } from "@/config/constant";

interface NavBarState {
  isClosed: boolean;
  key: string;
}

const initialState: NavBarState = {
  isClosed: false,
  key: KEY_NAVBAR.dashboard.key,
};

export const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    change: (state) => {
      state.isClosed = !state.isClosed;
    },
    selectKey: (state, actions) => {
      state.key = actions.payload;
    },
  },
});

const navBarReducer = navBarSlice.reducer;

export const { change, selectKey } = navBarSlice.actions;

export default navBarReducer;
