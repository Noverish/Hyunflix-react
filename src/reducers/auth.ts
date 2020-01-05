import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loginAsync, registerAsync, logoutAsync, tokenExpire, validateTokenAction } from 'actions';

export const sessionId = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.sessionId)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.sessionId)
  .handleAction([tokenExpire, logoutAsync.success], () => '');

export const username = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.username)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.username)
  .handleAction(validateTokenAction.success, (_, action: ReturnType<typeof validateTokenAction.success>) => action.payload.username)
  .handleAction([tokenExpire, logoutAsync.success], () => '');

const reducer = combineReducers({
  sessionId,
  username,
});

export default reducer;

export type AuthState = ReturnType<typeof reducer>;
