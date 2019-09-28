import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import {
  videoArticleList,
  videoArticle,
  videoSearch,
  videoTagList,
  videoSubtitleList,
} from 'actions';
import { VideoArticle, Subtitle } from 'models';

export const articles = createReducer([] as VideoArticle[])
  .handleAction(videoArticleList.success, (_, action: ReturnType<typeof videoArticleList.success>) => action.payload);

export const article = createReducer(null as (VideoArticle | null))
  .handleAction(videoArticle.success, (_, action: ReturnType<typeof videoArticle.success>) => action.payload);
  
export const subtitles = createReducer([] as Subtitle[])
  .handleAction(videoSubtitleList.success, (_, action: ReturnType<typeof videoSubtitleList.success>) => action.payload);

export const searched = createReducer([] as VideoArticle[])
  .handleAction(videoArticleList.success, (_, action: ReturnType<typeof videoArticleList.success>) => action.payload)
  .handleAction(videoSearch.success, (_, action: ReturnType<typeof videoSearch.success>) => action.payload);

export const loading = createReducer(false as boolean)
  .handleAction([videoArticleList.request, videoSearch.request], () => true)
  .handleAction([videoArticleList.success, videoArticleList.failure, videoSearch.success, videoSearch.failure], () => false);

export const tags = createReducer([] as string[])
  .handleAction(videoTagList.success, (_, action: ReturnType<typeof videoTagList.success>) => action.payload);

const reducer = combineReducers({
  articles,
  article,
  subtitles,
  loading,
  searched,
  tags,
});

export default reducer;

export type VideoState = ReturnType<typeof reducer>;