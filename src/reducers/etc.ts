import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { windowResize } from 'actions';
import { MOBILE_BREAKPOINT } from 'config';

export const isMobile = createReducer(window.innerWidth <= MOBILE_BREAKPOINT as boolean)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerWidth <= MOBILE_BREAKPOINT);

export const width = createReducer(window.innerWidth as number)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerWidth);

export const height = createReducer(window.innerHeight as number)
  .handleAction(windowResize, (_, action: ReturnType<typeof windowResize>) => window.innerHeight);

const reducer = combineReducers({
  isMobile,
  width,
  height,
});

export default reducer;

export type AuthState = ReturnType<typeof reducer>;
  