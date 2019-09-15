import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { regCodeListAsync, regCodeAddAsync } from 'actions';
import { RegCode } from 'models';

export const regCodeList = createReducer([] as RegCode[])
  .handleAction(regCodeListAsync.success, (state, action: ReturnType<typeof regCodeListAsync.success>) => action.payload);

const reducer = combineReducers({
  regCodes: regCodeList,
});

export default reducer;
