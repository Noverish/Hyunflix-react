import { VideoArticle } from 'models';

export interface UserVideo {
  userId: number;
  article: VideoArticle;
  time: number;
  date: string;
}