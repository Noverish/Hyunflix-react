import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { musicListAsync, musicPlaylistAdd, musicNowPlayingChange, musicRandomPlayToggle, musicLoopPlayToggle, musicPlayNextAsync, musicTagListAsync, musicSearch, musicPlaylistRemove } from 'actions';
import { Music } from 'models';
import { COLORS } from 'config';

export const musics = createReducer([] as Music[])
  .handleAction(musicListAsync.success, (_, action: ReturnType<typeof musicListAsync.success>) => action.payload);

export const playlist = createReducer([] as Music[])
  .handleAction(musicPlaylistAdd, (state, action: ReturnType<typeof musicPlaylistAdd>) => [...state, ...action.payload.filter(m => !state.includes(m))])
  .handleAction(musicPlaylistRemove, (state, action: ReturnType<typeof musicPlaylistRemove>) => state.filter(m => m.id !== action.payload.id));

export const nowPlaying = createReducer(null as (Music | null))
  .handleAction(musicNowPlayingChange, (_, action: ReturnType<typeof musicNowPlayingChange>) => action.payload)
  .handleAction(musicPlaylistAdd, (state, action: ReturnType<typeof musicPlaylistAdd>) => (state) ? state : action.payload[0])
  .handleAction(musicPlayNextAsync.success, (_, action: ReturnType<typeof musicPlayNextAsync.success>) => action.payload);

export const randomPlay = createReducer(false as boolean)
  .handleAction(musicRandomPlayToggle, (state, _) => !state);
  
export const loopPlay = createReducer(0 as number)
  .handleAction(musicLoopPlayToggle, (state, _) => (state + 1) % 3);

export const tags = createReducer(new Map<string, string>())
  .handleAction(musicTagListAsync.success, (_, action: ReturnType<typeof musicTagListAsync.success>) => {
    const map = new Map<string, string>();
    const tags: string[] = action.payload;
    
    tags.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));
    
    return map;
  });

export const searched = createReducer([] as Music[])
  .handleAction(musicListAsync.success, (_, action: ReturnType<typeof musicListAsync.success>) => action.payload)
  .handleAction(musicSearch.success, (_, action: ReturnType<typeof musicSearch.success>) => action.payload);

export const loading = createReducer(false as boolean)
  .handleAction([musicListAsync.request, musicSearch.request], () => true)
  .handleAction([musicListAsync.success, musicListAsync.failure, musicSearch.success, musicSearch.failure], () => false);

const reducer = combineReducers({
  loading,
  musics,
  playlist,
  nowPlaying,
  randomPlay,
  loopPlay,
  tags,
  searched,
});

export default reducer;

export type MusicState = ReturnType<typeof reducer>;