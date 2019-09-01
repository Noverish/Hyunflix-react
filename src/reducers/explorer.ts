import { READDIR_SUCCESS, READDIR_FAIL } from '../actions';

import { File } from 'models';

const explorerInitialState = {
  files: new Array<File>(),
  errMsg: ''
}

const reducer = (state = explorerInitialState, action) => {
  switch(action.type) {
    case READDIR_SUCCESS: 
      return {
        ...state,
        files: action.files,
      };
    case READDIR_FAIL:
      return {
        ...state,
        errMsg: action.errMsg,
      }
    default:
      return state;
  }
}

export default reducer;