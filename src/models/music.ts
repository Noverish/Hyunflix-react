export interface Music {
  musicId: number;
  title: string;
  path: string;
  duration: number;
  artist: string;
  url: string;
}

export enum LoopPlayType {
  NO_LOOP = 0,
  LOOP_ONE = 1,
  LOOP_ALL = 2,
}