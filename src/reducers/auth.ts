import { combineReducers } from 'redux';
import { createReducer, StateType } from 'typesafe-actions';

import { loginAsync, registerAsync, logoutAction, refreshTokenExpireAction, reissueAccessTokenAction } from 'actions';

export const refreshToken = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.refreshToken)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.refreshToken)
  .handleAction([refreshTokenExpireAction, logoutAction], () => '');

export const accessToken = createReducer('' as string)
  .handleAction(loginAsync.success, (_, action: ReturnType<typeof loginAsync.success>) => action.payload.accessToken)
  .handleAction(registerAsync.success, (_, action: ReturnType<typeof registerAsync.success>) => action.payload.accessToken)
  .handleAction(reissueAccessTokenAction.success, (_, action: ReturnType<typeof reissueAccessTokenAction.success>) => action.payload)
  .handleAction([refreshTokenExpireAction, logoutAction], () => '');

const reducer = combineReducers({
  refreshToken,
  accessToken,
});

export default reducer;

export type AuthState = StateType<typeof reducer>;
