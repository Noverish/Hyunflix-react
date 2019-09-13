import { Music } from 'models';

export const MUSIC_LIST = 'MUSIC_LIST';
export const MUSIC_LIST_SUCCESS = 'MUSIC_LIST_SUCCESS';

export interface MusicListAction {
  type: typeof MUSIC_LIST;
}

export interface MusicListSuccessAction {
  type: typeof MUSIC_LIST_SUCCESS;
  musics: Music[];
}

export function musicList(): MusicListAction {
  return {
    type: MUSIC_LIST,
  }
}

export function musicListSuccess(musics: Music[]): MusicListSuccessAction {
  return {
    type: MUSIC_LIST_SUCCESS,
    musics,
  }
}
