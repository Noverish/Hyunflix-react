import { put, call, takeEvery } from 'redux-saga/effects';
import { MUSIC_LIST, musicListSuccess, MusicListAction } from 'actions';
import * as Api from 'api';
import { Music } from 'models';

export function* fetchMusicList(action: MusicListAction) {
  try {
    const musics: Music[] = yield call([Api, 'musicList']);
    yield put(musicListSuccess(musics));
  } catch (errMsg) {
    
  }
}

export function* watchMusicList() {
  yield takeEvery(MUSIC_LIST, fetchMusicList);
}


export default [
  watchMusicList(),
]
