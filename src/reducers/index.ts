import { combineReducers } from 'redux';

import auth from './auth';
import video from './video';
import music from './music';
import etc from './etc';

const counterApp = combineReducers({
  auth,
  video,
  music,
  etc,
});

export default counterApp;
