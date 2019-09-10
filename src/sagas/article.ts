import { put, call, takeEvery } from 'redux-saga/effects';
import { VIDEO_ARTICLE_LIST, videoArticleListSuccess, VideoArticleListAction, tokenSuccess } from 'actions';
import * as Api from 'api';
import { VideoArticle } from 'models';

export function* fetchVideoArticleList(action: VideoArticleListAction) {
  try {
    const articles: VideoArticle[] = yield call([Api, 'videoArticleList']);
    yield put(videoArticleListSuccess(articles));
  } catch (errMsg) {
    
  }
}

export function* watchVideoArticleList() {
  yield takeEvery(VIDEO_ARTICLE_LIST, fetchVideoArticleList);
}

export default [
  watchVideoArticleList(),
]
