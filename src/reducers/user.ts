import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { regCodeListAsync, regCodeAddAsync, userVideoList } from 'actions';
import { RegCode, UserVideo } from 'models';

export const regCodeList = createReducer([] as RegCode[])
  .handleAction(regCodeListAsync.success, (state, action: ReturnType<typeof regCodeListAsync.success>) => action.payload)
  .handleAction(regCodeAddAsync.success, (state, action: ReturnType<typeof regCodeAddAsync.success>) => [...state, action.payload]);

export const userVideos = createReducer([] as UserVideo[])
  .handleAction(userVideoList.success, (_, action: ReturnType<typeof userVideoList.success>) => action.payload);

const reducer = combineReducers({
  regCodes: regCodeList,
  userVideos,
});

export default reducer;
