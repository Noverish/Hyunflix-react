import { put, call, takeEvery } from 'redux-saga/effects';
import { ENCODE_LIST, encodeListSuccess, EncodeListAction } from 'actions';
import * as Api from 'api';
import { Encode } from 'models';

export function* fetchEncodeList(action: EncodeListAction) {
  try {
    const encodes: Encode[] = yield call([Api, 'encodeStatus']);
    yield put(encodeListSuccess(encodes));
  } catch (errMsg) {

  }
}

export function* watchEncodeList() {
  yield takeEvery(ENCODE_LIST, fetchEncodeList);
}

export default [
  watchEncodeList(),
];
