import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import auth from './auth';
import video from './video';
import music from './music';
import etc from './etc';

const rootReducer = combineReducers({
  auth,
  video,
  music,
  etc,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
