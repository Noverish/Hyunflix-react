import { all } from 'redux-saga/effects';
import logger from 'redux-logger';

import explorer from './explorer';
import auth from './auth';
import movie from './movie';
import encode from './encode';
import tvProgram from './tv-program';
import article from './article';

export default function* rootSaga() {
  yield all([
    ...explorer,
    ...auth,
    ...movie,
    ...encode,
    ...tvProgram,
    ...article,
    process.env.NODE_ENV === 'development' && logger,
  ])
}