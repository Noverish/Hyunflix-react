export interface Movie {
  videoId: number;
  title: string;
  path: string;
  duration: number;
  width: number;
  height: number;
  bitrate: number;
  size: number;
  date: string;
  resolution: string;
}

export interface VideoSubtitle {
  language: string;
  url: string;
}

export interface VideoSrc {
  resolution: string;
  width: number;
  height: number;
  url: string;
}

export interface Video {
  title: string;
  subtitles: VideoSubtitle[];
  srcs: VideoSrc[];
  thumbnailUrl: string | null;
  date: string;
  duration: number;
}

export interface File {
  path: string;
  name: string;
  isdir: boolean;
  size: string;
  url: string;
}

export interface Encode {
  encodeId: number;
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
  url: string;
}

export interface TVProgram {
  videoId: number;
  seriesName: string;
  episodeName: string;
  episodeNumber: number;
  broadcastDate: string;
  date: string;
}