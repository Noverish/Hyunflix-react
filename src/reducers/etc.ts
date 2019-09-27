import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { windowResize, readdir } from 'actions';
import { File } from 'models';
import { MOBILE_BREAKPOINT } from 'config';

export const isMobile = createReducer(window.innerWidth <= MOBILE_BREAKPOINT as boolean)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerWidth <= MOBILE_BREAKPOINT);

export const width = createReducer(window.innerWidth as number)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerWidth);

export const height = createReducer(window.innerHeight as number)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerHeight);

export const files = createReducer([] as File[])
  .handleAction(readdir.success, (_, action: ReturnType<typeof readdir.success>) => action.payload);

const reducer = combineReducers({
  isMobile,
  width,
  height,
  files,
});

export default reducer;

export type AuthState = ReturnType<typeof reducer>;
  