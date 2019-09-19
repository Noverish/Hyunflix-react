export * from './auth';
export * from './music';

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

export interface TVProgram {
  videoId: number;
  seriesName: string;
  episodeName: string;
  episodeNumber: number;
  broadcastDate: string;
  date: string;
}

export interface VideoArticle {
  articleId: number;
  videoId: number;
  category: string;
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

export interface RegCode {
  codeId: number;
  userId: number | null;
  realname: string;
  code: string;
  date: string;
}
