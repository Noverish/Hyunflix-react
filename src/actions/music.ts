import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { Music } from 'models';

export const musicPlaylistAdd = createStandardAction('MUSIC_PLAYLIST_ADD')<Music[]>();
export const musicPlaylistRemove = createStandardAction('MUSIC_PLAYLIST_REMOVE')<Music>();

export const musicTagListAsync = createAsyncAction(
  'MUSIC_TAG_LIST_REQUEST',
  'MUSIC_TAG_LIST_SUCCESS',
  'MUSIC_TAG_LIST_FAILURE',
)<undefined, string[], string>();

export const musicAdd = createAsyncAction(
  'MUSIC_ADD_REQUEST',
  'MUSIC_ADD_SUCCESS',
  'MUSIC_ADD_FAILURE',
)<string, void, string>();
