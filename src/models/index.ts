export interface MoviePreview {
  movie_id: number;
  title: string;
  path: string;
  duration: number;
  resolution: string;
  date: string;
}

export interface VideoSubtitle {
  language: string;
  path: string;
}

export interface VideoSrc {
  resolution: string;
  width: number;
  height: number;
  path: string;
}

export interface Video {
  title: string;
  subtitles: VideoSubtitle[];
  srcs: VideoSrc[];
  thumbnail: string | null;
  date: string;
  duration: number;
}

export interface File {
  path: string;
  name: string;
  isdir: boolean;
  size: string;
}

export interface Encode {
  _id: number;
  target: string;
  status: string;
  progress: number;
  date: string;
}