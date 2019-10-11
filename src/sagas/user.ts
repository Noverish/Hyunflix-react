import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { regCodeListAsync, regCodeAddAsync, userVideoList } from 'actions';
import * as Api from 'api';
import { RegCode, UserVideo } from 'models';
import { store } from 'index';

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

function* fetchUserVideoList(action: ReturnType<typeof userVideoList.request>) {
  const userId = store.getState().auth.userId;
  
  try {
    const userVideos: UserVideo[] = (yield call([Api, 'userVideoList'], userId)) as UserVideo[];
    yield put(userVideoList.success(userVideos));
  } catch (err) {
    yield put(userVideoList.failure(err));
  }
}

export function* watchRegCodeList() {
  yield takeEvery(getType(regCodeListAsync.request), fetchRegCodeList);
}

export function* watchRegCodeAdd() {
  yield takeEvery(getType(regCodeAddAsync.request), fetchRegCodeAdd);
}

export function* watchUserVideoList() {
  yield takeEvery(getType(userVideoList.request), fetchUserVideoList);
}

export default [
  watchRegCodeList(),
  watchRegCodeAdd(),
  watchUserVideoList(),
]
