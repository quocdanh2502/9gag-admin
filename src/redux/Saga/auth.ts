import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import authApi from "@/services/api/login";
import { Auth, Token } from "@/models/auth";
import { signIn, signInError, signInSuccess, signOut } from "../Slice/auth";

function* handleSignIn(action: PayloadAction<Auth>): Generator {
  try {
    const response: Token = (yield call(
      authApi.postAuthLogin,
      action.payload
    ) as unknown) as Token;
    localStorage.setItem("token", response.token);
    yield put(signInSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(signInError("ERROR"));
  }
}

function* handleSignOut(): Generator {
  localStorage.removeItem("token");
  yield put(signOut(""));
}

function* authSaga(): Generator {
  yield takeLatest(signIn.type, handleSignIn);
  yield takeLatest(signOut.type, handleSignOut);
}

export default authSaga;
