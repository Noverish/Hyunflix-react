export interface Video {
  videoId: number;
  url: string;
  duration: number;
  width: number;
  height: number;
  bitrate: number;
  size: string;
}

export interface Subtitle {
  language: string;
  url: string;
}

export interface VideoArticle {
  articleId: number;
  videos: Video[];
  tags: string[];
  title: string;
  date: string;
}

export interface VideoBundle {
  bundleId: number;
  articles: VideoArticle[];
  title: string;
  category: string;
}