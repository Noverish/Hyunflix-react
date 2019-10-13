import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { readdir } from 'actions';
import * as Api from 'api';
import { File } from 'models';

export function* fetchReaddir(action: ReturnType<typeof readdir.request>) {
  const path: string = action.payload;
  try {
    const exists: boolean = yield call([Api, 'exists'], path);

    if (!exists) {
      yield put(readdir.failure('존재하지 않는 경로 입니다'));
      return;
    }

    const isdir: boolean = yield call([Api, 'isdir'], path);
    if (isdir) {
      const files: File[] = yield call([Api, 'readdir'], path);
      yield put(readdir.success(files));
    } else {
      yield put(readdir.failure('해당 경로가 폴더가 아닙니다'));
    }
  } catch (errMsg) {
    yield put(readdir.failure(errMsg));
  }
}

export function* watchReaddir() {
  yield takeEvery(getType(readdir.request), fetchReaddir);
}

export default [
  watchReaddir(),
];
