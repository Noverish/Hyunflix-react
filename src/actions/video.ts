import { createAsyncAction } from 'typesafe-actions';
import { VideoArticle, Subtitle } from 'models';

export const videoArticleList = createAsyncAction(
  'VIDEO_LIST_REQUEST',
  'VIDEO_LIST_SUCCESS',
  'VIDEO_LIST_FAILURE'
)<undefined, VideoArticle[], string>();

export const videoArticle = createAsyncAction(
  'VIDEO_CONTENT_REQUEST',
  'VIDEO_CONTENT_SUCCESS',
  'VIDEO_CONTENT_FAILURE'
)<number, VideoArticle, string>();

export const videoSearch = createAsyncAction(
  'VIDEO_SEARCH_REQUEST',
  'VIDEO_SEARCH_SUCCESS',
  'VIDEO_SEARCH_FAILURE'
)<string, VideoArticle[], string>();

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