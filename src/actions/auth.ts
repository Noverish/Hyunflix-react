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

export const logoutAction = createStandardAction('LOGOUT')<undefined>();

export const reissueAccessTokenAction = createAsyncAction(
  'ACCESS_TOKEN_EXPIRE_REQUEST',
  'ACCESS_TOKEN_EXPIRE_SUCCESS',
  'ACCESS_TOKEN_EXPIRE_FAILURE',
)<string, string, string>();

export const refreshTokenExpireAction = createStandardAction('REFRESH_TOKEN_EXPIRE')<undefined>();
