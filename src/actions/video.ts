import { createAsyncAction } from 'typesafe-actions';
import { VideoArticle, Subtitle } from 'models';

export const videoArticle = createAsyncAction(
  'VIDEO_CONTENT_REQUEST',
  'VIDEO_CONTENT_SUCCESS',
  'VIDEO_CONTENT_FAILURE'
)<number, VideoArticle, string>();

export const videoTagList = createAsyncAction(
  'VIDEO_TAG_LIST_REQUEST',
  'VIDEO_TAG_LIST_SUCCESS',
  'VIDEO_TAG_LIST_FAILURE'
)<undefined, string[], string>();

export const videoSubtitleList = createAsyncAction(
  'VIDEO_SUBTITLE_LIST_REQUEST',
  'VIDEO_SUBTITLE_LIST_SUCCESS',
  'VIDEO_SUBTITLE_LIST_FAILURE'
)<number, Subtitle[], string>();