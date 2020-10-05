import { combineReducers } from '@reduxjs/toolkit';
import * as player from './player';
import * as tags from './tags';

export const reducer = combineReducers({
  player: player.reducer,
  tags: tags.reducer,
});

export const actions = {
  player: player.actions,
  tags: tags.actions,
}

export const sagas = [
  ...player.sagas,
  ...tags.sagas,
]
