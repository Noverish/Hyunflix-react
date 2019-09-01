import { Video, Movie } from 'models';

export const MOVIE_LIST = 'MOVIE_LIST';
export const MOVIE_LIST_SUCCESS = 'MOVIE_LIST_SUCCESS';
export const MOVIE_DETAIL = 'MOVIE_DETAIL';
export const MOVIE_DETAIL_SUCCESS = 'MOVIE_DETAIL_SUCCESS';

export const movieList = () => ({
  type: MOVIE_LIST,
});

export const movieListSuccess = (movies: Movie[]) => ({
  type: MOVIE_LIST_SUCCESS,
  movies,
});

export const movieDetail = (movieId: number) => ({
  type: MOVIE_DETAIL,
  movieId,
});

export const movieDetailSuccess = (video: Video) => ({
  type: MOVIE_DETAIL_SUCCESS,
  video,
})