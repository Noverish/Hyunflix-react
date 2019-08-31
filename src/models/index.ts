export interface Movie {
  movie_id: number;
  title: string;
  path: string;
  duration: number;
  resolution: string[];
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
  inpath: string;
  outpath: string;
  options: string;
  progress: number;
  date: string;
}

export interface Music {
  music_id: number;
  title: string;
  path: string;
  duration: number;
  artist: string;
}