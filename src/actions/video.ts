import { VideoArticle, Subtitle } from 'models';

export const VIDEO_ARTICLE_LIST = 'VIDEO_ARTICLE_LIST';
export const VIDEO_ARTICLE_LIST_SUCCESS = 'VIDEO_ARTICLE_LIST_SUCCESS';
export const VIDEO_ARTICLE_CONTENT = 'VIDEO_ARTICLE_CONTENT';
export const VIDEO_ARTICLE_CONTENT_SUCCESS = 'VIDEO_ARTICLE_CONTENT_SUCCESS';

export interface VideoArticleListAction {
  type: typeof VIDEO_ARTICLE_LIST;
}

export interface VideoArticleListSuccessAction {
  type: typeof VIDEO_ARTICLE_LIST_SUCCESS;
  articles: VideoArticle[];
}

export interface VideoArticleContentAction {
  type: typeof VIDEO_ARTICLE_CONTENT;
  articleId: number;
}

export interface VideoArticleContentSuccessAction {
  type: typeof VIDEO_ARTICLE_CONTENT_SUCCESS;
  article: VideoArticle;
  subtitles: Subtitle[];
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

export function videoArticleContent(articleId: number): VideoArticleContentAction {
  return {
    type: VIDEO_ARTICLE_CONTENT,
    articleId,
  }
}

export function videoArticleContentSuccess(article: VideoArticle, subtitles: Subtitle[]): VideoArticleContentSuccessAction {
  return {
    type: VIDEO_ARTICLE_CONTENT_SUCCESS,
    article, subtitles,
  }
}