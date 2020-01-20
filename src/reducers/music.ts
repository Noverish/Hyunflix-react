import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { musicTagListAsync } from 'actions';
import { COLORS } from 'config';

const tags = createReducer(new Map<string, string>())
  .handleAction(musicTagListAsync.success, (_, action: ReturnType<typeof musicTagListAsync.success>) => {
    const map = new Map<string, string>();
    const tags: string[] = action.payload;

    tags.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

const reducer = combineReducers({
  tags,
});

export default reducer;

export type MusicState = ReturnType<typeof reducer>;
