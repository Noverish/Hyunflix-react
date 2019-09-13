import { put, call, takeEvery } from 'redux-saga/effects';

import { EXPLORE, exploreSuccess, ExploreAction } from 'actions';
import * as Api from 'api';
import { File } from 'models';

export function* fetchReaddir(action: ExploreAction) {
  const path: string = action.path;
  try {
    const exists: boolean = yield call([Api, 'exists'], path);
    
    if(!exists) {
      yield put(exploreSuccess(null));
      return;
    }
    
    const isdir: boolean = yield call([Api, 'isdir'], path);
    if(isdir) {
      const files: File[] = yield call([Api, 'readdir'], path);
      yield put(exploreSuccess(files));
      return;
    }
    
    yield put(exploreSuccess(null));
  } catch (errMsg) {
    
  }
}

export function* watchExlorer() {
  yield takeEvery(EXPLORE, fetchReaddir);
}

export default [
  watchExlorer()
]
