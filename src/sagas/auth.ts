import { put, call, takeEvery } from 'redux-saga/effects';
import { LOGIN, LOGOUT, REGISTER, tokenSuccess, LoginAction, LogoutAction, RegisterAction } from 'actions';
import * as Api from 'api';
import { cookie } from 'utils';

export function* fetchLogin(action: LoginAction) {
  const username: string = action.username;
  const password: string = action.password;
  try {
    const token: string = yield call([Api, 'login'], username, password);
    cookie.deleteCookie('x-hyunsub-token');
    cookie.setCookie('x-hyunsub-token', token, 1);
    yield put(tokenSuccess(token));
  } catch (errMsg) {
    
  }
}

// TODO 쿠키 이름을 서버에서 받아오기
export function* fetchLogout(action: LogoutAction) {
  cookie.deleteCookie('x-hyunsub-token');
  yield put(tokenSuccess(''));
}

export function* fetchRegister(action: RegisterAction) {
  const username: string = action.username;
  const password: string = action.password;
  const regCode: string = action.regCode;
  try {
    const token = yield call([Api, 'register'], username, password, regCode);
    cookie.deleteCookie('x-hyunsub-token');
    cookie.setCookie('x-hyunsub-token', token, 1);
    yield put(tokenSuccess(token));
  } catch (errMsg) {
    
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN, fetchLogin);
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, fetchLogout);
}

export function* watchRegister() {
  yield takeEvery(REGISTER, fetchRegister);
}

export default [
  watchLogin(),
  watchLogout(),
  watchRegister(),
]
