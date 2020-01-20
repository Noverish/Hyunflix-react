import { createAsyncAction } from 'typesafe-actions';

export const musicTagListAsync = createAsyncAction(
  'MUSIC_TAG_LIST_REQUEST',
  'MUSIC_TAG_LIST_SUCCESS',
  'MUSIC_TAG_LIST_FAILURE',
)<undefined, string[], string>();
