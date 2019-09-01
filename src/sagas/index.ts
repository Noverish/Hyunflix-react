import { all } from 'redux-saga/effects'
import explorer from './explorer';
import auth from './auth';
import movie from './movie';
import encode from './encode';

export default function* rootSaga() {
  yield all([
    ...explorer,
    ...auth,
    ...movie,
    ...encode,
  ])
}