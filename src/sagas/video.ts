import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { videoArticle, videoTagList, videoSubtitleList } from 'actions';
import * as Api from 'api';
import { VideoArticle, Subtitle } from 'models';

export function* fetchVideoArticle(action: ReturnType<typeof videoArticle.request>) {
  const articleId: number = action.payload;
  
  try {
    const article: VideoArticle = yield call([Api, 'videoArticle'], articleId);
    yield put(videoArticle.success(article));
    // TODO 여러 비디오 지원
    const subtitles: Subtitle[] = yield call([Api, 'videoSubtitleList'], article.videos[0].id);
    yield put(videoSubtitleList.success(subtitles));
  } catch (errMsg) {
    yield put(videoArticle.failure(errMsg));
  }
}

export function* fetchVideoTagList() {
  try {
    const result: string[] = yield call([Api, 'videoTagList']);
    yield put(videoTagList.success(result));
  } catch (errMsg) {
    yield put(videoTagList.failure(errMsg));
  }
}

export function* fetchVideoSubtitleList(action: ReturnType<typeof videoSubtitleList.request>) {
  const videoId: number = action.payload;
  
  try {
    const result: Subtitle[] = yield call([Api, 'videoSubtitleList'], videoId);
    yield put(videoSubtitleList.success(result));
  } catch (errMsg) {
    yield put(videoSubtitleList.failure(errMsg));
  }
}

export function* watchVideoArticleContent() {
  yield takeEvery(getType(videoArticle.request), fetchVideoArticle);
}

export function* watchVideoTagList() {
  yield takeEvery(getType(videoTagList.request), fetchVideoTagList);
}

export function* watchVideoSubtitleList() {
  yield takeEvery(getType(videoSubtitleList.request), fetchVideoSubtitleList);
}

export default [
  watchVideoArticleContent(),
  watchVideoTagList(),
  watchVideoSubtitleList(),
]
