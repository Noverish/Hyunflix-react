import { combineReducers } from 'redux';
import { createReducer, StateType } from 'typesafe-actions';

import { COLORS } from 'src/config';

import { videoTagList } from 'src/actions';

export const tags = createReducer(new Map<string, string>())
  .handleAction(videoTagList.success, (_, action: ReturnType<typeof videoTagList.success>) => {
    const map = new Map<string, string>();
    const tags2: string[] = action.payload;

    tags2.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

const reducer = combineReducers({
  tags,
});

export default reducer;

export type VideoState = StateType<typeof reducer>;
