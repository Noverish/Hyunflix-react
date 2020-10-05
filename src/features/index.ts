import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import * as auth from './auth';
import * as video from './video';
import * as music from './music';
import * as screen from './screen';

const rootReducer = combineReducers({
  auth: auth.reducer,
  video: video.reducer,
  music: music.reducer,
  screen: screen.reducer,
});

export const RootActions = {
  auth: auth.actions,
  video: video.actions,
  music: music.actions,
  screen: screen.actions,
}

function* rootSaga() {
  yield all([
    ...auth.sagas,
    ...video.sagas,
    ...music.sagas,
  ]);
}

const authString: string | null = localStorage.getItem('auth');
const persistedState = authString ? { auth: JSON.parse(authString) } : undefined;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware, logger),
)

sagaMiddleware.run(rootSaga)

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth));
});

export type RootState = ReturnType<typeof rootReducer>;

export type RootDispatch = typeof store.dispatch;
