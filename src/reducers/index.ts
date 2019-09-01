import { combineReducers } from 'redux';

import explorer from './explorer';
import auth from './auth';
import movie from './movie';

const counterApp = combineReducers({
  explorer,
  auth,
  movie,
});

export default counterApp;
