import { VideoArticle } from 'models';

export const VIDEO_ARTICLE_LIST = 'VIDEO_ARTICLE_LIST';
export const VIDEO_ARTICLE_LIST_SUCCESS = 'VIDEO_ARTICLE_LIST_SUCCESS';

export interface VideoArticleListAction {
  type: typeof VIDEO_ARTICLE_LIST;
}

export interface VideoArticleListSuccessAction {
  type: typeof VIDEO_ARTICLE_LIST_SUCCESS;
  articles: VideoArticle[];
}

export function videoArticleList(): VideoArticleListAction {
  return {
    type: VIDEO_ARTICLE_LIST,
  }
}

export function videoArticleListSuccess(articles: VideoArticle[]): VideoArticleListSuccessAction {
  return {
    type: VIDEO_ARTICLE_LIST_SUCCESS,
    articles,
  }
}