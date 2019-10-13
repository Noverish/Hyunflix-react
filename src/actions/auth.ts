import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { LoginParam, RegisterParam, LoginResult } from 'models';

export const loginAsync = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
)<LoginParam, LoginResult, string>();

export const registerAsync = createAsyncAction(
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE',
)<RegisterParam, LoginResult, string>();

export const logoutAsync = createAsyncAction(
  'LOGOUT_REQUEST',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAILURE',
)<undefined, undefined, string>();

export const tokenExpire = createStandardAction('TOKEN_EXPIRE')<undefined>();
