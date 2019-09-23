export interface VideoArticle {
  articleId: number;
  videoId: number;
  tags: string[];
  title: string;
  date: string;
  url: string;
  duration: number;
  width: number;
  height: number;
  bitrate: number;
  size: number;
}

export interface Subtitle {
  language: string;
  url: string;
}
