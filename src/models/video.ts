export interface Video {
  id: number;
  title: string;
  url: string;
  path: string;
  tags: string[];
  date: string;

  duration: number;
  width: number;
  height: number;
  bitrate: number;
  size: number;

  durationString: string;
  bitrateString: string;
  sizeString: string;
  resolution: string;
}

export interface VideoSeries {
  id: number;
  videos: Video[];
  title: string;
  category: string;
}

export interface Subtitle {
  language: string;
  url: string;
}
