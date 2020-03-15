import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { registerAsync, loginAsync, reissueAccessTokenAction } from 'src/actions';
import { LoginResult } from 'src/models';
import * as Api from 'src/api';
import { registerReissueAccessTokenAction } from 'src/workers';

export function* fetchLogin(action: ReturnType<typeof loginAsync.request>) {
  try {
    const result: LoginResult = yield call([Api, 'login'], action.payload);
    yield put(loginAsync.success(result));
    registerReissueAccessTokenAction(result.accessToken);
  } catch (errMsg) {
    yield put(loginAsync.failure(errMsg));
  }
}

export function* fetchRegister(action: ReturnType<typeof registerAsync.request>) {
  try {
    const result: LoginResult = yield call([Api, 'register'], action.payload);
    yield put(registerAsync.success(result));
    registerReissueAccessTokenAction(result.accessToken);
  } catch (errMsg) {
    yield put(registerAsync.failure(errMsg));
  }
}

export function* fetchAccessTokenExpire(action: ReturnType<typeof reissueAccessTokenAction.request>) {
  try {
    const result: string = yield call([Api, 'reissueAccessToken'], action.payload);
    yield put(reissueAccessTokenAction.success(result));
    registerReissueAccessTokenAction(result);
  } catch (errMsg) {
    yield put(reissueAccessTokenAction.failure(errMsg));
  }
}

export function* watchLogin() {
  yield takeEvery(getType(loginAsync.request), fetchLogin);
}

export function* watchRegister() {
  yield takeEvery(getType(registerAsync.request), fetchRegister);
}

export function* watchAccessTokenExpire() {
  yield takeEvery(getType(reissueAccessTokenAction.request), fetchAccessTokenExpire);
}

export default [
  watchLogin(),
  watchRegister(),
  watchAccessTokenExpire(),
];
