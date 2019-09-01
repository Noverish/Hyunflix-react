import { TOKEN_SUCCESS, TOKEN_EXPIRE } from '../actions';

const initalState = {
  token: '',
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case TOKEN_SUCCESS: return { ...state, token: action.token };
    case TOKEN_EXPIRE:  return { ...state, token: '' };
    default: return state;
  }
}

export default reducer;