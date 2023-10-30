import { configureStore } from "@reduxjs/toolkit";

import navBarReducer from "./Slice/navBar";
import headerReducer from "./Slice/header";
import authenticateReducer from "./Slice/authenticate";
import userReducer from "./Slice/user";

export const store = configureStore({
  reducer: {
    change: navBarReducer,
    switch: headerReducer,
    auth: authenticateReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
