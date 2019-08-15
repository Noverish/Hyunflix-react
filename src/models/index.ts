export interface MoviePreview {
  movie_id: number;
  title: string;
  path: string;
  date: string;
}

export interface Subtitle {
  language: string;
  src: string;
}

export interface Video {
  resolution: number;
  src: string;
}

export interface MovieDetail {
  title: string;
  path: string;
  subtitles: Subtitle[];
  videos: Video[];
  poster: string | null;
  thumbnail: string | null;
  date: string;
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