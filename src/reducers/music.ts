import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { musicListAsync, musicPlaylistAdd, musicNowPlayingChange, musicRandomPlayToggle, musicLoopPlayToggle } from 'actions';
import { Music } from 'models';

export const isLoadingMusicList = createReducer(false as boolean)
  .handleAction([musicListAsync.request], (state, action) => true)
  .handleAction(
    [musicListAsync.success, musicListAsync.failure],
    (state, action) => false
  );

export const musicList = createReducer([] as Music[])
  .handleAction(musicListAsync.success, (state, action: ReturnType<typeof musicListAsync.success>) => action.payload);

export const playlist = createReducer([] as Music[])
  .handleAction(musicPlaylistAdd, (state, action: ReturnType<typeof musicPlaylistAdd>) => [...state, ...action.payload]);

export const nowPlaying = createReducer(null as (Music | null))
  .handleAction(musicNowPlayingChange, (state, action: ReturnType<typeof musicNowPlayingChange>) => action.payload)
  .handleAction(musicPlaylistAdd, (state, action: ReturnType<typeof musicPlaylistAdd>) =>  (state) ? state : action.payload[0]);

export const randomPlay = createReducer(false as boolean)
  .handleAction(musicRandomPlayToggle, (state, action) => !state);
  
export const loopPlay = createReducer(0 as number)
  .handleAction(musicLoopPlayToggle, (state, action) => (state + 1) % 3);

const reducer = combineReducers({
  isLoadingMusicList,
  musics: musicList,
  playlist: playlist,
  nowPlaying: nowPlaying,
  randomPlay: randomPlay,
  loopPlay: loopPlay,
});

export default reducer;

export type MusicState = ReturnType<typeof reducer>;