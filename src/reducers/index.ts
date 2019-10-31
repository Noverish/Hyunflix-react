import { combineReducers } from 'redux';

import auth from './auth';
import video from './video';
import music from './music';
import user from './user';
import etc from './etc';

const counterApp = combineReducers({
  auth,
  video,
  music,
  user,
  etc,
});

export default counterApp;
