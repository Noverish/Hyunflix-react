import { combineReducers } from 'redux';

import explorer from './explorer';
import auth from './auth';
import encode from './encode';
import video from './video';
import music from './music';

const counterApp = combineReducers({
  explorer,
  auth,
  encode,
  video,
  music,
});

export default counterApp;
