import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as Api from 'src/api';
import { COLORS } from 'src/config';

const request = createAction('video/tags/request');

type State = {[tag: string]: string};

const initialState: State = {};

const slice = createSlice({
  name: 'video/tags',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<State>) => action.payload,
  },
});

export const reducer = slice.reducer;

export const actions = {
  ...slice.actions,
  request,
}

function* fetch() {
  try {
    const map = {};
    const result: string[] = yield call([Api, 'videoTagList']);
    result.forEach((t, i) => map[t] = COLORS[i % COLORS.length]);
    yield put(actions.set(map));
  } catch (errMsg) {

  }
}

function* watch() {
  yield takeEvery(request.type, fetch);
}

export const sagas = [
  watch(),
];
