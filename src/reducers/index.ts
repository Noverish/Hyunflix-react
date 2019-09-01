import { combineReducers } from 'redux';

import explorer from './explorer';
import auth from './auth';
import movie from './movie';
import encode from './encode';

const counterApp = combineReducers({
  explorer,
  auth,
  movie,
  encode,
});

export default counterApp;
