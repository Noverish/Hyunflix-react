import { combineReducers } from 'redux';

import explorer from './explorer';
import auth from './auth';
import movie from './movie';
import encode from './encode';
import tvProgram from './tv-program';
import article from './article';

const counterApp = combineReducers({
  explorer,
  auth,
  movie,
  encode,
  tvProgram,
  article,
});

export default counterApp;
