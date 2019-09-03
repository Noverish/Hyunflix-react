import { put, call, takeEvery } from 'redux-saga/effects';
import { MOVIE_LIST, MOVIE_DETAIL, movieListSuccess, movieDetailSuccess, MovieListAction, MovieDetailAction } from 'actions';
import * as Api from 'api';

export function* fetchMovieList(action: MovieListAction) {
  try {
    const movies = yield call([Api, 'getMoviePreviewList']);
    yield put(movieListSuccess(movies));
  } catch (errMsg) {
    
  }
}

export function* fetchMovieDetail(action: MovieDetailAction) {
  const movieId: number = action.movieId;
  try {
    const video = yield call([Api, 'getMovieDetail'], movieId);
    yield put(movieDetailSuccess(video));
  } catch (errMsg) {
    
  }
}

export function* watchMovieList() {
  yield takeEvery(MOVIE_LIST, fetchMovieList);
}

export function* watchMovieDetail() {
  yield takeEvery(MOVIE_DETAIL, fetchMovieDetail);
}

export default [
  watchMovieList(),
  watchMovieDetail(),
]
