import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { regCodeListAsync, regCodeAddAsync } from 'actions';
import { RegCode } from 'models';

export const regCodeList = createReducer([] as RegCode[])
  .handleAction(regCodeListAsync.success, (state, action: ReturnType<typeof regCodeListAsync.success>) => action.payload)
  .handleAction(regCodeAddAsync.success, (state, action: ReturnType<typeof regCodeAddAsync.success>) => [...state, action.payload]);

const reducer = combineReducers({
  regCodes: regCodeList,
});

export default reducer;
