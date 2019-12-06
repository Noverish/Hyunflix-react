import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loginAsync, registerAsync, logoutAsync, tokenExpire } from 'actions';

export const token = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.token)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.token)
  .handleAction([tokenExpire, logoutAsync.success], () => '');

const reducer = combineReducers({
  token,
});

export default reducer;

export type AuthState = ReturnType<typeof reducer>;
