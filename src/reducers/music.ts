import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { musicListAsync } from 'actions';
import { Music } from 'models';

export const isLoadingMusicList = createReducer(false as boolean)
  .handleAction([musicListAsync.request], (state, action) => true)
  .handleAction(
    [musicListAsync.success, musicListAsync.failure],
    (state, action) => false
  );

export const musicList = createReducer([] as Music[])
  .handleAction(musicListAsync.success, (state, action: ReturnType<typeof musicListAsync.success>) => action.payload);

const reducer = combineReducers({
  isLoadingMusicList,
  musics: musicList,
});

export default reducer;

export type MusicState = ReturnType<typeof reducer>;