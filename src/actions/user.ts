import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { RegCode } from 'models';

export const regCodeListAsync = createAsyncAction(
  'REG_CODE_LIST_REQUEST',
  'REG_CODE_LIST_SUCCESS',
  'REG_CODE_LIST_FAILURE'
)<undefined, RegCode[], string>();

export const regCodeAddAsync = createAsyncAction(
  'REG_CODE_ADD_REQUEST',
  'REG_CODE_ADD_SUCCESS',
  'REG_CODE_ADD_FAILURE'
)<RegCodeAddParam, undefined, string>();

export interface RegCodeAddParam {
  realname: string;
  code: string;
}