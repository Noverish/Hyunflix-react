import { combineReducers } from 'redux';

import explorer from './explorer';
import auth from './auth';
import encode from './encode';
import video from './video';
import music from './music';
import user from './user';

const counterApp = combineReducers({
  explorer,
  auth,
  encode,
  video,
  music,
  user,
});

export default counterApp;
