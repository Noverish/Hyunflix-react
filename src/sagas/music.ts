import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { musicListAsync } from 'actions';
import * as Api from 'api';
import { Music } from 'models';

function* fetchMusicList(action: ReturnType<typeof musicListAsync.request>): Generator {
  try {
    const musics: Music[] = (yield call([Api, 'musicList'])) as Music[];
    yield put(musicListAsync.success(musics));
  } catch (err) {
    yield put(musicListAsync.failure(err));
  }
}

export function* watchMusicList() {
  yield takeEvery(getType(musicListAsync.request), fetchMusicList);
}

export default [
  watchMusicList(),
]
