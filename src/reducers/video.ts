import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { COLORS } from 'config';

import { videoTagList } from 'actions';

export const tags = createReducer(new Map<string, string>())
  .handleAction(videoTagList.success, (_, action: ReturnType<typeof videoTagList.success>) => {
    const map = new Map<string, string>();
    const tags: string[] = action.payload;

    tags.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

const reducer = combineReducers({
  tags,
});

export default reducer;

export type VideoState = ReturnType<typeof reducer>;
