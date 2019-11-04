import { createAsyncAction } from 'typesafe-actions';

export const videoTagList = createAsyncAction(
  'VIDEO_TAG_LIST_REQUEST',
  'VIDEO_TAG_LIST_SUCCESS',
  'VIDEO_TAG_LIST_FAILURE',
)<undefined, string[], string>();
