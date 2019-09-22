import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { musicListAsync, musicPlayNextAsync } from 'actions';
import * as Api from 'api';
import { Music, LoopPlayType } from 'models';
import { store } from 'index';

function* fetchMusicList(action: ReturnType<typeof musicListAsync.request>): Generator {
  try {
    const musics: Music[] = (yield call([Api, 'musicList'])) as Music[];
    yield put(musicListAsync.success(musics));
  } catch (err) {
    yield put(musicListAsync.failure(err));
  }
}

function* fetchMusicPlayNext(action: ReturnType<typeof musicPlayNextAsync.request>): Generator {
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
      const nextMusic = {...nowPlaying} as Music;
      yield put(musicPlayNextAsync.success(nextMusic));
      return;
    }
  }
  
  const nextMusic = (playlist[nextIndex]) ? playlist[nextIndex] : null;
  yield put(musicPlayNextAsync.success(nextMusic));
}

export function* watchMusicList() {
  yield takeEvery(getType(musicListAsync.request), fetchMusicList);
}

export function* watchMusicPlayNext() {
  yield takeEvery(getType(musicPlayNextAsync.request), fetchMusicPlayNext);
}

export default [
  watchMusicList(),
  watchMusicPlayNext(),
]
