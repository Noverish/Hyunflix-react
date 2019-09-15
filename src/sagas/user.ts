import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { regCodeListAsync, regCodeAddAsync } from 'actions';
import * as Api from 'api';
import { RegCode } from 'models';

function* fetchRegCodeList(action: ReturnType<typeof regCodeListAsync.request>): Generator {
  try {
    const regCodes: RegCode[] = (yield call([Api, 'regCodeList'])) as RegCode[];
    yield put(regCodeListAsync.success(regCodes));
  } catch (err) {
    yield put(regCodeListAsync.failure(err));
  }
}

function* fetchRegCodeAdd(action: ReturnType<typeof regCodeAddAsync.request>): Generator {
  const realname = action.payload.realname;
  const code = action.payload.code;
  
  try {
    const regCode: RegCode = (yield call([Api, 'regCodeAdd'], realname, code)) as RegCode;
    yield put(regCodeAddAsync.success(regCode));
  } catch (err) {
    yield put(regCodeAddAsync.failure(err));
  }
}

export function* watchRegCodeList() {
  yield takeEvery(getType(regCodeListAsync.request), fetchRegCodeList);
}

export function* watchRegCodeAdd() {
  yield takeEvery(getType(regCodeAddAsync.request), fetchRegCodeAdd);
}

export default [
  watchRegCodeList(),
  watchRegCodeAdd(),
]
