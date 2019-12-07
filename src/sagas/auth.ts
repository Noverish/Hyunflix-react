import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { registerAsync, loginAsync, logoutAsync, validateTokenAction } from 'actions';
import { LoginResult } from 'models';
import * as Api from 'api';

export function* fetchLogin(action: ReturnType<typeof loginAsync.request>) {
  try {
    const result: LoginResult = yield call([Api, 'login'], action.payload);
    yield put(loginAsync.success(result));
  } catch (errMsg) {
    yield put(loginAsync.failure(errMsg));
  }
}

export function* fetchRegister(action: ReturnType<typeof registerAsync.request>) {
  try {
    const result: LoginResult = yield call([Api, 'register'], action.payload);
    yield put(registerAsync.success(result));
  } catch (errMsg) {
    yield put(registerAsync.failure(errMsg));
  }
}

export function* fetchValidateToken() {
  try {
    const result: LoginResult = yield call([Api, 'validateToken']);
    yield put(validateTokenAction.success(result));
  } catch (errMsg) {
    yield put(validateTokenAction.failure(errMsg));
  }
}

export function* fetchLogout(action: ReturnType<typeof logoutAsync.request>) {
  try {
    yield put(logoutAsync.success());
  } catch (errMsg) {
    yield put(logoutAsync.failure(errMsg));
  }
}

export function* watchLogin() {
  yield takeEvery(getType(loginAsync.request), fetchLogin);
}

export function* watchLogout() {
  yield takeEvery(getType(logoutAsync.request), fetchLogout);
}

export function* watchRegister() {
  yield takeEvery(getType(registerAsync.request), fetchRegister);
}

export function* watchValidateToken() {
  yield takeEvery(getType(validateTokenAction.request), fetchValidateToken);
}

export default [
  watchLogin(),
  watchLogout(),
  watchRegister(),
  watchValidateToken(),
];
