import { combineReducers } from 'redux';
import { createReducer, StateType } from 'typesafe-actions';

import { musicTagListAsync } from 'src/actions';
import { COLORS } from 'src/config';

const tags = createReducer(new Map<string, string>())
  .handleAction(musicTagListAsync.success, (_, action: ReturnType<typeof musicTagListAsync.success>) => {
    const map = new Map<string, string>();
    const tags2: string[] = action.payload;

    tags2.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

const reducer = combineReducers({
  tags,
});

export default reducer;

export type MusicState = StateType<typeof reducer>;
