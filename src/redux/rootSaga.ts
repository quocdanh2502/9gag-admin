import { all } from "redux-saga/effects";

import authSaga from "./Saga/auth";

function* rootSaga() {
  yield all([authSaga()]);
}

export default rootSaga;
