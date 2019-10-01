import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import {
  videoArticle,
  videoTagList,
  videoSubtitleList,
} from 'actions';
import { VideoArticle, Subtitle } from 'models';

export const article = createReducer(null as (VideoArticle | null))
  .handleAction(videoArticle.success, (_, action: ReturnType<typeof videoArticle.success>) => action.payload);
  
export const subtitles = createReducer([] as Subtitle[])
  .handleAction(videoSubtitleList.success, (_, action: ReturnType<typeof videoSubtitleList.success>) => action.payload);

export const tags = createReducer([] as string[])
  .handleAction(videoTagList.success, (_, action: ReturnType<typeof videoTagList.success>) => action.payload);

const reducer = combineReducers({
  article,
  subtitles,
  tags,
});

export default reducer;

export type VideoState = ReturnType<typeof reducer>;