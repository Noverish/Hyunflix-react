import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loginAsync, registerAsync, logoutAsync, tokenExpire } from 'actions';

export const token = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.token)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.token)
  .handleAction([tokenExpire, logoutAsync.success], () => '');

export const userId = createReducer(-1 as number)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.userId)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.userId)
  .handleAction([tokenExpire, logoutAsync.success], () => -1);

export const authority = createReducer([] as string[])
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.authority)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.authority)
  .handleAction([tokenExpire, logoutAsync.success], () => []);

export const isAdmin = createReducer(false as boolean)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.authority.includes('admin'))
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.authority.includes('admin'))
  .handleAction([tokenExpire, logoutAsync.success], () => false);

const reducer = combineReducers({
  token,
  userId,
  authority,
  isAdmin,
});

export default reducer;

export type AuthState = ReturnType<typeof reducer>;
  