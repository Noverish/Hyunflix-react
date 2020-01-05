import { Video } from 'models';

export interface UserVideo {
  video: Video;
  time: number;
  date: string;
}

export interface UserVideoTime {
  sessionId: string;
  videoId: number;
  time: number;
}
