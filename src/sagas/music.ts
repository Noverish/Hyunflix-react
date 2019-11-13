import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { musicTagListAsync } from 'actions';
import * as Api from 'api';

function* fetchMusicTagList(): Generator {
  try {
    const tags: string[] = (yield call([Api, 'musicTagList'])) as string[];
    yield put(musicTagListAsync.success(tags));
  } catch (err) {
    yield put(musicTagListAsync.failure(err));
  }
}

export function* watchMusicTagList() {
  yield takeEvery(getType(musicTagListAsync.request), fetchMusicTagList);
}

export default [
  watchMusicTagList(),
];
