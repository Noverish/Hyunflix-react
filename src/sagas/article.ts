import { put, call, takeEvery } from 'redux-saga/effects';
import { VIDEO_ARTICLE_LIST, videoArticleListSuccess, VideoArticleListAction,
         VIDEO_ARTICLE_CONTENT, videoArticleContentSuccess, VideoArticleContentAction, } from 'actions';
import * as Api from 'api';
import { VideoArticle, Subtitle } from 'models';

export function* fetchVideoArticleList(action: VideoArticleListAction) {
  try {
    const articles: VideoArticle[] = yield call([Api, 'videoArticleList']);
    yield put(videoArticleListSuccess(articles));
  } catch (errMsg) {
    
  }
}

export function* fetchVideoArticleContent(action: VideoArticleContentAction) {
  const articleId: number = action.articleId;
  
  try {
    const tmp: any = yield call([Api, 'videoArticleContent'], articleId);
    const article: VideoArticle = tmp.article;
    const subtitles: Subtitle[] = tmp.subtitles;
    yield put(videoArticleContentSuccess(article, subtitles));
  } catch (errMsg) {
    
  }
}

export function* watchVideoArticleList() {
  yield takeEvery(VIDEO_ARTICLE_LIST, fetchVideoArticleList);
}

export function* watchVideoArticleContent() {
  yield takeEvery(VIDEO_ARTICLE_CONTENT, fetchVideoArticleContent);
}

export default [
  watchVideoArticleList(),
  watchVideoArticleContent(),
]
