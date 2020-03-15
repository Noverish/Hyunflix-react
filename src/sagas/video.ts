import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { videoTagList } from 'src/actions';
import * as Api from 'src/api';

export function* fetchVideoTagList() {
  try {
    const result: string[] = yield call([Api, 'videoTagList']);
    yield put(videoTagList.success(result));
  } catch (errMsg) {
    yield put(videoTagList.failure(errMsg));
  }
}

export function* watchVideoTagList() {
  yield takeEvery(getType(videoTagList.request), fetchVideoTagList);
}

export default [
  watchVideoTagList(),
];
