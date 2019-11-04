import { Video } from 'models';

export interface UserVideo {
  userId: number;
  video: Video;
  time: number;
  date: string;
}

export interface UserVideoTime {
  userId: number;
  videoId: number;
  time: number;
}
