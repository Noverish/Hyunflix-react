import { TOKEN_FAIL, TOKEN_SUCCESS, TOKEN_EXPIRE } from '../actions';

const explorerInitialState = {
  token: '',
}

const reducer = (state = explorerInitialState, action) => {
  switch(action.type) {
    case TOKEN_SUCCESS: return { ...state, token: action.token };
    case TOKEN_FAIL:    return { ...state, token: '' };
    case TOKEN_EXPIRE:  return { ...state, token: '' };
    default: return state;
  }
}

export default reducer;