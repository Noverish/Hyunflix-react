export interface Music {
  youtube: string | null;
  duration: number;
  id: number;
  path: string;
  tags: string[];
  title: string;
  url: string;
}

export enum LoopPlayType {
  NO_LOOP = 0,
  LOOP_ONE = 1,
  LOOP_ALL = 2,
}

export enum YoutubeStage {
  ready = 0,
  download = 1,
  encode = 2,
  success = 3,
}

export interface MusicPlaylist {
  id: number;
  title: string;
  musics: Music[];
}
