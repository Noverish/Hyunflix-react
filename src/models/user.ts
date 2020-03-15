import { Video } from 'src/models';

export interface UserVideo {
  video: Video;
  time: number;
  date: string;
}

export interface UserVideoTime {
  token: string;
  videoId: number;
  time: number;
}
