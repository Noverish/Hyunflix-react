import { put, call, delay, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as hangul from 'hangul-js';

import { videoArticleList, videoArticle, videoSearch, videoTagList, videoSubtitleList } from 'actions';
import * as Api from 'api';
import { VideoArticle, Subtitle } from 'models';
import { store } from 'index';
import { USER_INPUT_DEBOUNCE } from 'config';

export function* fetchVideoArticleList() {
  try {
    const result: VideoArticle[] = yield call([Api, 'videoArticleList']);
    yield put(videoArticleList.success(result));
  } catch (errMsg) {
    yield put(videoArticleList.failure(errMsg));
  }
}

export function* fetchVideoArticle(action: ReturnType<typeof videoArticle.request>) {
  const articleId: number = action.payload;
  
  try {
    const article: VideoArticle = yield call([Api, 'videoArticle'], articleId);
    yield put(videoArticle.success(article));
    // TODO 여러 비디오 지원
    const subtitles: Subtitle[] = yield call([Api, 'videoSubtitleList'], article.videos[0].videoId);
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

function* fetchVideoSearch(action: ReturnType<typeof videoSearch.request>): Generator {
  yield delay(USER_INPUT_DEBOUNCE);
  const { articles } = store.getState().video;
  const query: string = action.payload.replace(' ', '');
  
  const koSearcher = new hangul.Searcher(query);
  const enSearcher = new RegExp(query, 'i');
  
  const searched = (query) ? articles.filter((m: VideoArticle) => {
    const targets = [m.title, ...m.tags];
    return targets.some(t => {
      t = t.replace(/ /g, '');
      return t.search(enSearcher) >= 0 || koSearcher.search(t) >= 0;
    });
  }) : articles;
  
  yield put(videoSearch.success(searched));
}

export function* watchVideoArticleList() {
  yield takeEvery(getType(videoArticleList.request), fetchVideoArticleList);
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

export function* watchVideoSearch() {
  yield takeLatest(getType(videoSearch.request), fetchVideoSearch);
}

export default [
  watchVideoArticleList(),
  watchVideoArticleContent(),
  watchVideoTagList(),
  watchVideoSubtitleList(),
  watchVideoSearch(),
]
