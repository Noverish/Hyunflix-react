import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { musicPlayNextAsync, musicTagListAsync } from 'actions';
import * as Api from 'api';
import { Music, LoopPlayType } from 'models';
import { store } from 'index';

function* fetchMusicTagList(): Generator {
  try {
    const tags: string[] = (yield call([Api, 'musicTagList'])) as string[];
    yield put(musicTagListAsync.success(tags));
  } catch (err) {
    yield put(musicTagListAsync.failure(err));
  }
}

function* fetchMusicPlayNext(): Generator {
  const { playlist, randomPlay, loopPlay, nowPlaying } = store.getState().music;

  let nextIndex: number = 0;

  if (nowPlaying !== null) {
    const index: number = playlist.indexOf(nowPlaying);

    if (loopPlay === LoopPlayType.LOOP_ONE) {
      nextIndex = index;
    } else if (loopPlay === LoopPlayType.NO_LOOP) {
      if (randomPlay) {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } else {
        nextIndex = (index + 1 < playlist.length) ? (index + 1) : -1;
      }
    } else if (loopPlay === LoopPlayType.LOOP_ALL) {
      if (randomPlay) {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } else {
        nextIndex = (index + 1) % playlist.length;
      }
    }

    if (nextIndex === index) {
      const nextMusic = { ...nowPlaying } as Music;
      yield put(musicPlayNextAsync.success(nextMusic));
      return;
    }
  }

  const nextMusic = (playlist[nextIndex]) ? playlist[nextIndex] : null;
  yield put(musicPlayNextAsync.success(nextMusic));
}

export function* watchMusicTagList() {
  yield takeEvery(getType(musicTagListAsync.request), fetchMusicTagList);
}

export function* watchMusicPlayNext() {
  yield takeEvery(getType(musicPlayNextAsync.request), fetchMusicPlayNext);
}

export default [
  watchMusicTagList(),
  watchMusicPlayNext(),
];
