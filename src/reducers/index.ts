import { combineReducers } from 'redux';

import counter from './counter';
import explorer from './explorer';

const counterApp = combineReducers({
  counter,
  explorer
});

export default counterApp;