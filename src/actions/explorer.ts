import { File, Video } from 'models';

export const EXPLORE = 'EXPLORE';
export const EXPLORE_SUCCESS = 'EXPLORE_SUCCESS';

export interface ExploreAction {
  type: typeof EXPLORE;
  path: string;
}

export interface ExploreSuccessAction {
  type: typeof EXPLORE_SUCCESS;
  files: File[] | null;
  video: Video | null;
}

export function explore(path: string): ExploreAction {
  return {
    type: EXPLORE,
    path,
  }
}

export function exploreSuccess(files: File[] | null, video: Video | null): ExploreSuccessAction {
  return {
    type: EXPLORE_SUCCESS,
    files, video,
  }
}
