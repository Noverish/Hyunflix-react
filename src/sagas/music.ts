import { put, call, delay, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as hangul from 'hangul-js';

import { musicListAsync, musicPlayNextAsync, musicTagListAsync, musicSearch } from 'actions';
import * as Api from 'api';
import { Music, LoopPlayType } from 'models';
import { store } from 'index';
import { USER_INPUT_DEBOUNCE } from 'config';

function* fetchMusicList(): Generator {
  try {
    const musics: Music[] = (yield call([Api, 'musicList'])) as Music[];
    yield put(musicListAsync.success(musics));
  } catch (err) {
    yield put(musicListAsync.failure(err));
  }
}

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

function* fetchMusicSearch(action: ReturnType<typeof musicSearch.request>): Generator {
  yield delay(USER_INPUT_DEBOUNCE);
  const { musics } = store.getState().music;
  const query: string = action.payload.replace(' ', '');

  const koSearcher = new hangul.Searcher(query);
  const enSearcher = new RegExp(query, 'i');

  const searched = (query) ? musics.filter((m: Music) => {
    const targets = [m.title, ...m.tags];
    return targets.some((t) => {
      const t2 = t.replace(/ /g, '');
      return t2.search(enSearcher) >= 0 || koSearcher.search(t2) >= 0;
    });
  }) : musics;

  yield put(musicSearch.success(searched));
}

export function* watchMusicList() {
  yield takeEvery(getType(musicListAsync.request), fetchMusicList);
}

export function* watchMusicTagList() {
  yield takeEvery(getType(musicTagListAsync.request), fetchMusicTagList);
}

export function* watchMusicPlayNext() {
  yield takeEvery(getType(musicPlayNextAsync.request), fetchMusicPlayNext);
}

export function* watchMusicSearch() {
  yield takeLatest(getType(musicSearch.request), fetchMusicSearch);
}

export default [
  watchMusicList(),
  watchMusicTagList(),
  watchMusicPlayNext(),
  watchMusicSearch(),
];
