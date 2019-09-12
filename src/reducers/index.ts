import { combineReducers } from 'redux';

import explorer from './explorer';
import auth from './auth';
import encode from './encode';
import article from './article';

const counterApp = combineReducers({
  explorer,
  auth,
  encode,
  article,
});

export default counterApp;
