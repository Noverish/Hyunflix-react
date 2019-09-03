import { Video, Movie } from 'models';

export const MOVIE_LIST = 'MOVIE_LIST';
export const MOVIE_LIST_SUCCESS = 'MOVIE_LIST_SUCCESS';
export const MOVIE_DETAIL = 'MOVIE_DETAIL';
export const MOVIE_DETAIL_SUCCESS = 'MOVIE_DETAIL_SUCCESS';

export interface MovieListAction {
  type: typeof MOVIE_LIST;
}

export interface MovieListSuccessAction {
  type: typeof MOVIE_LIST_SUCCESS;
  movies: Movie[];
}

export interface MovieDetailAction {
  type: typeof MOVIE_DETAIL;
  movieId: number;
}

export interface MovieDetailSuccessAction {
  type: typeof MOVIE_DETAIL_SUCCESS;
  video: Video;
}

export function movieList(): MovieListAction {
  return {
    type: MOVIE_LIST,
  }
}

export function movieListSuccess(movies: Movie[]): MovieListSuccessAction {
  return {
    type: MOVIE_LIST_SUCCESS,
    movies,
  }
}

export function movieDetail(movieId: number): MovieDetailAction {
  return {
    type: MOVIE_DETAIL,
    movieId,
  }
}

export function movieDetailSuccess(video: Video): MovieDetailSuccessAction {
  return {
    type: MOVIE_DETAIL_SUCCESS,
    video,
  }
}
