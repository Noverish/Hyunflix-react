import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loginAsync, registerAsync, logoutAsync, tokenExpire, validateTokenAction } from 'actions';

export const token = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.token)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.token)
  .handleAction([tokenExpire, logoutAsync.success], () => '');

export const username = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.username)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.username)
  .handleAction(validateTokenAction.success, (_, action: ReturnType<typeof validateTokenAction.success>) => action.payload.username)
  .handleAction([tokenExpire, logoutAsync.success], () => '');

const reducer = combineReducers({
  token,
  username,
});

export default reducer;

export type AuthState = ReturnType<typeof reducer>;
