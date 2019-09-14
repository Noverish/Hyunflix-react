import { createAsyncAction } from 'typesafe-actions';

import { Music } from 'models';

export const musicListAsync = createAsyncAction(
  'MUSIC_LIST_REQUEST',
  'MUSIC_LIST_SUCCESS',
  'MUSIC_LIST_FAILURE'
)<undefined, Music[], string>();