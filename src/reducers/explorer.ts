import { EXPLORE_SUCCESS } from '../actions';
import { File, Video } from 'models';

interface State {
  files: File[] | null;
  video: Video | null;
}

const initalState: State = {
  files: null,
  video: null,
}

const reducer = (state: State = initalState, action) => {
  switch(action.type) {
    case EXPLORE_SUCCESS: return { ...state, files: action.files, video: action.video };
    default: return state;
  }
}

export default reducer;