import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { registerAsync, loginAsync, logoutAsync } from 'actions';
import { LoginResult } from 'models';
import * as Api from 'api';
import { cookie } from 'utils';

// TODO 쿠키 이름을 서버에서 받아오기
export function* fetchLogin(action: ReturnType<typeof loginAsync.request>) {
  try {
    const result: LoginResult = yield call([Api, 'login'], action.payload);
    cookie.deleteCookie('x-hyunsub-token');
    cookie.setCookie('x-hyunsub-token', result.token, 1);
    yield put(loginAsync.success(result));
  } catch (errMsg) {
    yield put(loginAsync.failure(errMsg));
  }
}

export function* fetchRegister(action: ReturnType<typeof registerAsync.request>) {
  try {
    const result: LoginResult = yield call([Api, 'register'], action.payload);
    cookie.deleteCookie('x-hyunsub-token');
    cookie.setCookie('x-hyunsub-token', result.token, 1);
    yield put(registerAsync.success(result));
  } catch (errMsg) {
    yield put(registerAsync.failure(errMsg));
  }
}

export function* fetchLogout(action: ReturnType<typeof logoutAsync.request>) {
  try {
    // yield call([Api, 'logout']);
    cookie.deleteCookie('x-hyunsub-token');
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

export default [
  watchLogin(),
  watchLogout(),
  watchRegister(),
]
