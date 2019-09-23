import { createAsyncAction } from 'typesafe-actions';
import { VideoArticle } from 'models';
import { VideoArticleContentResult } from 'api';

export const videoList = createAsyncAction(
  'VIDEO_LIST_REQUEST',
  'VIDEO_LIST_SUCCESS',
  'VIDEO_LIST_FAILURE'
)<undefined, VideoArticle[], string>();

export const videoContent = createAsyncAction(
  'VIDEO_CONTENT_REQUEST',
  'VIDEO_CONTENT_SUCCESS',
  'VIDEO_CONTENT_FAILURE'
)<number, VideoArticleContentResult, string>();

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
