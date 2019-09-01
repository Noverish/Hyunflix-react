import { all } from 'redux-saga/effects'
import explorer from './explorer';
import counter from './counter';

export default function* rootSaga() {
  yield all([
    ...counter,
    ...explorer
  ])
}