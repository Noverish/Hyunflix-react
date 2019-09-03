import { TOKEN_SUCCESS, TOKEN_EXPIRE } from '../actions';

interface State {
  token: string;
}

const initalState: State = {
  token: '',
}

const reducer = (state: State = initalState, action) => {
  switch(action.type) {
    case TOKEN_SUCCESS: return { ...state, token: action.token };
    case TOKEN_EXPIRE:  return { ...state, token: '' };
    default: return state;
  }
}

export default reducer;