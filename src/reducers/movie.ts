import { MOVIE_LIST_SUCCESS, MOVIE_DETAIL_SUCCESS } from '../actions';
import { Movie } from 'models';

const initalState = {
  movies: new Array<Movie>(),
  video: null,
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case MOVIE_LIST_SUCCESS:   return { ...state, movies: action.movies };
    case MOVIE_DETAIL_SUCCESS: return { ...state, video: action.video };
    default: return state;
  }
}

export default reducer;