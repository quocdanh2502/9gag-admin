import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import mySaga from "./rootSaga";
import navBarReducer from "./Slice/navBar";
import headerReducer from "./Slice/header";
import authReducer from "./Slice/auth";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    change: navBarReducer,
    switch: headerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
