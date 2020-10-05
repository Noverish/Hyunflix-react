import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import * as Api from 'src/api';
import { RootState } from 'src/features';
import { Subtitle, Video } from 'src/models';

const request = createAction<number>('video/player/request');

type State = {
  video?: Video;
  subtitles?: Subtitle[];
  currentTime?: number;
};

const initialState: State = {};

const slice = createSlice({
  name: 'video/player',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<State>) => action.payload,
    clear: () => initialState,
  },
});

export const reducer = slice.reducer;

export const actions = {
  ...slice.actions,
  request,
}

function* fetch(action: ReturnType<typeof request>) {
  const videoId = action.payload;
  const accessToken = yield select((state: RootState) => state.auth.accessToken);

  try {
    const [video, subtitles, userVideo]  = yield all([
      call([Api, 'videoOne'], videoId),
      call([Api, 'videoSubtitleList'], videoId),
      call([Api, 'userVideoOne'], videoId),
    ])

    const videoWithToken = { ...video, url: `${video.url}?token=${accessToken}` };
    const subtitlesWithToken = subtitles.map(v => ({ ...v, url: `${v.url}?token=${accessToken}` }));
    const currentTime = userVideo?.time || 0;

    yield put(actions.set({
      video: videoWithToken,
      subtitles: subtitlesWithToken,
      currentTime,
    }));
  } catch (errMsg) {

  }
}

function* watch() {
  yield takeEvery(request.type, fetch);
}

export const sagas = [
  watch(),
];
