import { combineReducers } from '@reduxjs/toolkit';
import * as tags from './tags';

export const reducer = combineReducers({
  tags: tags.reducer,
});

export const actions = {
  tags: tags.actions,
}

export const sagas = [
  ...tags.sagas,
]
