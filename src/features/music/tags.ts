import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as Api from 'src/api';
import { COLORS } from 'src/config';

const request = createAction('music/tags/request');

type State = Map<string, string>;

const initialState: State = new Map<string, string>();

const slice = createSlice({
  name: 'music/tags',
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
    const map = new Map<string, string>();
    const result: string[] = yield call([Api, 'musicTagList']);
    result.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));
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
