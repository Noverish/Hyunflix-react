import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { videoList, videoContent, videoSearch, videoTagList } from 'actions';
import { VideoArticle, Subtitle } from 'models';

export const articles = createReducer([] as VideoArticle[])
  .handleAction(videoList.success, (_, action: ReturnType<typeof videoList.success>) => action.payload);

export const article = createReducer(null as (VideoArticle | null))
  .handleAction(videoContent.success, (_, action: ReturnType<typeof videoContent.success>) => action.payload.article);
  
export const subtitles = createReducer([] as Subtitle[])
  .handleAction(videoContent.success, (_, action: ReturnType<typeof videoContent.success>) => action.payload.subtitles);

export const searched = createReducer([] as VideoArticle[])
  .handleAction(videoList.success, (_, action: ReturnType<typeof videoList.success>) => action.payload)
  .handleAction(videoSearch.success, (_, action: ReturnType<typeof videoSearch.success>) => action.payload);

export const loading = createReducer(false as boolean)
  .handleAction([videoList.request, videoSearch.request], () => true)
  .handleAction([videoList.success, videoList.failure, videoSearch.success, videoSearch.failure], () => false);

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