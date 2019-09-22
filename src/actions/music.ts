import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { Music } from 'models';

export const musicListAsync = createAsyncAction(
  'MUSIC_LIST_REQUEST',
  'MUSIC_LIST_SUCCESS',
  'MUSIC_LIST_FAILURE'
)<undefined, Music[], string>();

export const musicPlaylistAdd = createStandardAction('MUSIC_PLAYLIST_ADD')<Music[]>();

export const musicNowPlayingChange = createStandardAction('MUSIC_NOW_PLAYING_CHANGE')<Music | null>();

export const musicRandomPlayToggle = createStandardAction('MUSIC_RANDOM_PLAY_TOGGLE')<undefined>();
export const musicLoopPlayToggle = createStandardAction('MUSIC_LOOP_PLAY_TOGGLE')<undefined>();

export const musicPlayNextAsync = createAsyncAction(
  'MUSIC_PLAY_NEXT_REQUEST',
  'MUSIC_PLAY_NEXT_SUCCESS',
  'MUSIC_PLAY_NEXT_FAILURE'
)<undefined, Music | null, undefined>();

export const musicPlayPrev = createStandardAction('MUSIC_PLAY_PREV')<undefined>();

export const musicTagListAsync = createAsyncAction(
  'MUSIC_TAG_LIST_REQUEST',
  'MUSIC_TAG_LIST_SUCCESS',
  'MUSIC_TAG_LIST_FAILURE'
)<undefined, string[], string>();

export const musicSearch = createAsyncAction(
  'MUSIC_SEARCH_REQUEST',
  'MUSIC_SEARCH_SUCCESS',
  'MUSIC_SEARCH_FAILURE'
)<string, Music[], Error>();