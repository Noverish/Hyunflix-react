import { all } from 'redux-saga/effects';
import logger from 'redux-logger';

import explorer from './explorer';
import auth from './auth';
import encode from './encode';
import article from './article';

export default function* rootSaga() {
  yield all([
    ...explorer,
    ...auth,
    ...encode,
    ...article,
    process.env.NODE_ENV === 'development' && logger,
  ])
}