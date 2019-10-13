import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { COLORS } from 'config';

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

export const tags = createReducer(new Map<string, string>())
  .handleAction(videoTagList.success, (_, action: ReturnType<typeof videoTagList.success>) => {
    const map = new Map<string, string>();
    const tags: string[] = action.payload;

    tags.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

const reducer = combineReducers({
  article,
  subtitles,
  tags,
});

export default reducer;

export type VideoState = ReturnType<typeof reducer>;
