import { combineReducers } from 'redux';

import counter from './counter';
import explorer from './explorer';
import auth from './auth';

const counterApp = combineReducers({
  counter,
  explorer,
  auth,
});

export default counterApp;
