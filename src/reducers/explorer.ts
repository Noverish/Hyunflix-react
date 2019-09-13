import { EXPLORE_SUCCESS } from '../actions';
import { File } from 'models';

interface State {
  files: File[] | null;
}

const initalState: State = {
  files: null,
}

const reducer = (state: State = initalState, action) => {
  switch(action.type) {
    case EXPLORE_SUCCESS: return { ...state, files: action.files };
    default: return state;
  }
}

export default reducer;