import { EXPLORE_SUCCESS } from '../actions';
import { File, Video } from 'models';

interface ExplorerReducer {
  files: File[] | null;
  video: Video | null;
}

const initalState: ExplorerReducer = {
  files: null,
  video: null,
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case EXPLORE_SUCCESS: return { ...state, files: action.files, video: action.video };
    default: return state;
  }
}

export default reducer;