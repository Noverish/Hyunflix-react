import { createAsyncAction } from 'typesafe-actions';

import { RegCode, UserVideo } from 'models';

export const regCodeListAsync = createAsyncAction(
  'REG_CODE_LIST_REQUEST',
  'REG_CODE_LIST_SUCCESS',
  'REG_CODE_LIST_FAILURE',
)<undefined, RegCode[], string>();

export const regCodeAddAsync = createAsyncAction(
  'REG_CODE_ADD_REQUEST',
  'REG_CODE_ADD_SUCCESS',
  'REG_CODE_ADD_FAILURE',
)<RegCodeAddParam, RegCode, string>();

export interface RegCodeAddParam {
  realname: string;
  code: string;
}

export const userVideoList = createAsyncAction(
  'USER_VIDEO_LIST_REQUEST',
  'USER_VIDEO_LIST_SUCCESS',
  'USER_VIDEO_LIST_FAILURE',
)<undefined, UserVideo[], string>();
