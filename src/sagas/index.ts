import { all } from 'redux-saga/effects';
import logger from 'redux-logger';

import explorer from './explorer';
import auth from './auth';
import movie from './movie';
import encode from './encode';
import tvProgram from './tv-program';

export default function* rootSaga() {
  yield all([
    ...explorer,
    ...auth,
    ...movie,
    ...encode,
    ...tvProgram,
    process.env.NODE_ENV === 'development' && logger,
  ])
}