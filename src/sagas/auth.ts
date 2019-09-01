import { put, call, takeEvery } from 'redux-saga/effects';
import { LOGIN, LOGOUT, REGISTER, tokenSuccess } from 'actions';
import * as Api from 'api';

export function* fetchLogin(action) {
  const username = action.username;
  const password = action.password;
  try {
    const token = yield call([Api, 'login'], username, password);
    yield put(tokenSuccess(token));
  } catch (errMsg) {
    
  }
}

export function* fetchLogout(action) {
  yield put(tokenSuccess(''));
}

export function* fetchRegister(action) {
  const username = action.username;
  const password = action.password;
  const regCode = action.regCode;
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
