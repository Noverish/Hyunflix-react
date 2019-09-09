import { put, call, takeEvery } from 'redux-saga/effects';
import { SERIES_LIST, EPISODE_LIST, EPISODE_DETAIL,
         seriesListSuccess, episodeListSuccess, episodeDetailSuccess,
         SeriesListAction, EpisodeListAction , EpisodeDetailAction } from 'actions';
import * as Api from 'api';

export function* fetchSeriesList(action: SeriesListAction) {
  try {
    const series = yield call([Api, 'seriesList']);
    yield put(seriesListSuccess(series));
  } catch (errMsg) {
    
  }
}

export function* fetchEpisodeList(action: EpisodeListAction) {
  try {
    const episodes = yield call([Api, 'episodeList'], action.seires);
    yield put(episodeListSuccess(episodes));
  } catch (errMsg) {
    
  }
}

export function* fetchEpisodeDetail(action: EpisodeDetailAction) {
  const series: string = action.series;
  const episodeNumber: number = action.episodeNumber;
  
  try {
    const video = yield call([Api, 'episodeDetail'], series, episodeNumber);
    yield put(episodeDetailSuccess(video));
  } catch (errMsg) {
    
  }
}

export function* watchSeriesList() {
  yield takeEvery(SERIES_LIST, fetchSeriesList);
}

export function* watchEpisodeList() {
  yield takeEvery(EPISODE_LIST, fetchEpisodeList);
}

export function* watchEpisodeDetail() {
  yield takeEvery(EPISODE_DETAIL, fetchEpisodeDetail);
}

export default [
  watchSeriesList(),
  watchEpisodeList(),
  watchEpisodeDetail(),
]
