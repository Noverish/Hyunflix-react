import { TVProgram, Video } from 'models';

export const SERIES_LIST = 'SERIES_LIST';
export const SERIES_LIST_SUCCESS = 'SERIES_LIST_SUCCESS';
export const EPISODE_LIST = 'EPISODE_LIST';
export const EPISODE_LIST_SUCCESS = 'EPISODE_LIST_SUCCESS';
export const EPISODE_DETAIL = 'EPISODE_DETAIL';
export const EPISODE_DETAIL_SUCCESS = 'EPISODE_DETAIL_SUCCESS';

export interface SeriesListAction {
  type: typeof SERIES_LIST;
}

export interface SeriesListSuccessAction {
  type: typeof SERIES_LIST_SUCCESS;
  series: string[];
}

export interface EpisodeListAction {
  type: typeof EPISODE_LIST;
  seires: string;
}

export interface EpisodeListSuccessAction {
  type: typeof EPISODE_LIST_SUCCESS;
  episodes: TVProgram[];
}

export interface EpisodeDetailAction {
  type: typeof EPISODE_DETAIL;
  series: string;
  episodeNumber: number;
}

export interface EpisodeDetailSuccessAction {
  type: typeof EPISODE_DETAIL_SUCCESS;
  video: Video;
}

export function seriesList(): SeriesListAction {
  return {
    type: SERIES_LIST,
  }
}

export function seriesListSuccess(series: string[]): SeriesListSuccessAction {
  return {
    type: SERIES_LIST_SUCCESS,
    series,
  }
}

export function episodeList(seires: string): EpisodeListAction {
  return {
    type: EPISODE_LIST,
    seires,
  }
}

export function episodeListSuccess(episodes: TVProgram[]): EpisodeListSuccessAction {
  return {
    type: EPISODE_LIST_SUCCESS,
    episodes,
  }
}

export function episodeDetail(series: string, episodeNumber: number): EpisodeDetailAction {
  return {
    type: EPISODE_DETAIL,
    series,
    episodeNumber,
  }
}

export function episodeDetailSuccess(video: Video): EpisodeDetailSuccessAction {
  return {
    type: EPISODE_DETAIL_SUCCESS,
    video,
  }
}
