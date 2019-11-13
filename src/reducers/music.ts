import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import differenceBy from 'lodash/differenceBy';

import { musicTagListAsync, musicPlaylistAdd, musicPlaylistRemove } from 'actions';
import { PlaylistDiff } from 'models';
import { COLORS } from 'config';

const initPlaylistDiff: PlaylistDiff = {
  oldPlaylist: [],
  newPlaylist: [],
  added: [],
  removed: null,
};

export const playlistDiff = createReducer(initPlaylistDiff)
  .handleAction(musicPlaylistAdd, (state, action: ReturnType<typeof musicPlaylistAdd>) => {
    const { newPlaylist } = state;
    const added = differenceBy(action.payload, newPlaylist, 'id');

    return {
      oldPlaylist: newPlaylist,
      newPlaylist: [...newPlaylist, ...added],
      added,
      removed: null,
    };
  })
  .handleAction(musicPlaylistRemove, (state, action: ReturnType<typeof musicPlaylistRemove>) => {
    const { newPlaylist } = state;
    const removed = action.payload;

    return {
      oldPlaylist: newPlaylist,
      newPlaylist: differenceBy(newPlaylist, [removed], 'id'),
      added: [],
      removed,
    };
  });

export const tags = createReducer(new Map<string, string>())
  .handleAction(musicTagListAsync.success, (_, action: ReturnType<typeof musicTagListAsync.success>) => {
    const map = new Map<string, string>();
    const tags: string[] = action.payload;

    tags.forEach((t, i) => map.set(t, COLORS[i % COLORS.length]));

    return map;
  });

const reducer = combineReducers({
  playlistDiff,
  tags,
});

export default reducer;

export type MusicState = ReturnType<typeof reducer>;
