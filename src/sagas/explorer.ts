import { put, call, takeEvery } from 'redux-saga/effects'
import { READDIR, readdirSuccess, readdirFail } from 'actions';
import * as Api from 'api';
import { File } from 'models';

export function* fetchReaddir(action) {
  const path: string = action.path;
  try {
    const files: File[] = yield call([Api, 'readdir'], path);
    yield put(readdirSuccess(files));
  } catch (errMsg) {
    yield put(readdirFail(errMsg));
  }
}

export function* watchReaddir() {
  yield takeEvery(READDIR, fetchReaddir);
}

export default [
  watchReaddir()
]
