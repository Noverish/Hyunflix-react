import { SERIES_LIST_SUCCESS, EPISODE_LIST_SUCCESS, EPISODE_DETAIL_SUCCESS } from '../actions';
import { TVProgram, Video } from 'models';

interface State {
  series: string[];
  episodes: TVProgram[];
  video: Video | null;
}

const initalState: State = {
  series: [],
  episodes: [],
  video: null,
}

const reducer = (state: State = initalState, action) => {
  switch(action.type) {
    case SERIES_LIST_SUCCESS:    return { ...state, series: action.series };
    case EPISODE_LIST_SUCCESS:   return { ...state, episodes: action.episodes };
    case EPISODE_DETAIL_SUCCESS: return { ...state, video: action.video };
    default: return state;
  }
}

export default reducer;