import { all } from 'redux-saga/effects';

import etc from './etc';
import auth from './auth';
import encode from './encode';
import video from './video';
import music from './music';
import user from './user';

export default function* rootSaga() {
  yield all([
    ...etc,
    ...auth,
    ...encode,
    ...video,
    ...music,
    ...user,
  ])
}