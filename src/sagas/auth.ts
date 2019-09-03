import { put, call, takeEvery } from 'redux-saga/effects';
import { LOGIN, LOGOUT, REGISTER, tokenSuccess, LoginAction, LogoutAction, RegisterAction } from 'actions';
import * as Api from 'api';

export function* fetchLogin(action: LoginAction) {
  const username: string = action.username;
  const password: string = action.password;
  try {
    const token: string = yield call([Api, 'login'], username, password);
    yield put(tokenSuccess(token));
  } catch (errMsg) {
    
  }
}

export function* fetchLogout(action: LogoutAction) {
  yield put(tokenSuccess(''));
}

export function* fetchRegister(action: RegisterAction) {
  const username: string = action.username;
  const password: string = action.password;
  const regCode: string = action.regCode;
  try {
    const token = yield call([Api, 'register'], username, password, regCode);
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
