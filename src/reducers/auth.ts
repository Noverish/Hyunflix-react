import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loginAsync, registerAsync, logoutAsync, tokenExpire } from 'actions';

export const token = createReducer('' as string)
  .handleAction(loginAsync.success, (state, action: ReturnType<typeof loginAsync.success>) => action.payload.token)
  .handleAction(registerAsync.success, (state, action: ReturnType<typeof registerAsync.success>) => action.payload.token)
  .handleAction(logoutAsync.success, (state, action: ReturnType<typeof logoutAsync.success>) => '')
  .handleAction(tokenExpire, (state, action: ReturnType<typeof tokenExpire>) => '');

export const userId = createReducer(-1 as number)
  .handleAction(loginAsync.success, (state, action: ReturnType<typeof loginAsync.success>) => action.payload.userId)
  .handleAction(registerAsync.success, (state, action: ReturnType<typeof registerAsync.success>) => action.payload.userId)
  .handleAction(tokenExpire, (state, action: ReturnType<typeof tokenExpire>) => -1);
  
const reducer = combineReducers({
  token,
  userId,
});

export default reducer;

export type AuthState = ReturnType<typeof reducer>;
  