import { File, Video } from 'models';

export const EXPLORE = 'EXPLORE';
export const EXPLORE_SUCCESS = 'EXPLORE_SUCCESS';

export const explore = (path: string) => ({
  type: EXPLORE,
  path,
});

export const exploreSuccess = (files: File[] | null, video: Video | null) => ({
  type: EXPLORE_SUCCESS,
  files, video
});