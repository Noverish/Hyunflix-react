export interface Video {
  id: number;
  url: string;
  duration: number;
  width: number;
  height: number;
  bitrate: number;
  size: string;
  durationString: string;
  bitrateString: string;
  sizeString: string;
  resolution: string;
}

export interface Subtitle {
  language: string;
  url: string;
}

export interface VideoArticle {
  id: number;
  videos: Video[];
  tags: string[];
  title: string;
  date: string;
}

export interface VideoBundle {
  id: number;
  articles: VideoArticle[];
  title: string;
  category: string;
}
