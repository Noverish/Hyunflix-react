import { combineReducers } from 'redux';

import explorer from './explorer';
import auth from './auth';
import encode from './encode';
import video from './video';
import music from './music';
import user from './user';
import etc from './etc';

const counterApp = combineReducers({
  explorer,
  auth,
  encode,
  video,
  music,
  user,
  etc,
});

export default counterApp;
