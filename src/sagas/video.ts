import { put, call, delay, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as hangul from 'hangul-js';

import { videoList, videoContent, videoSearch, videoTagList } from 'actions';
import * as Api from 'api';
import { VideoArticle } from 'models';
import { store } from 'index';
import { USER_INPUT_DEBOUNCE } from 'config';

export function* fetchVideoArticleList() {
  try {
    const articles: VideoArticle[] = yield call([Api, 'videoArticleList']);
    yield put(videoList.success(articles));
  } catch (errMsg) {
    yield put(videoList.failure(errMsg));
  }
}

export function* fetchVideoArticleContent(action: ReturnType<typeof videoContent.request>) {
  const articleId: number = action.payload;
  
  try {
    const result: Api.VideoArticleContentResult = yield call([Api, 'videoArticleContent'], articleId);
    yield put(videoContent.success(result));
  } catch (errMsg) {
    yield put(videoContent.failure(errMsg));
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
  yield takeEvery(getType(videoList.request), fetchVideoArticleList);
}

export function* watchVideoArticleContent() {
  yield takeEvery(getType(videoContent.request), fetchVideoArticleContent);
}

export function* watchVideoTagList() {
  yield takeEvery(getType(videoTagList.request), fetchVideoTagList);
}

export function* watchVideoSearch() {
  yield takeLatest(getType(videoSearch.request), fetchVideoSearch);
}

export default [
  watchVideoArticleList(),
  watchVideoArticleContent(),
  watchVideoTagList(),
  watchVideoSearch(),
]
