export * from './auth';
export * from './music';
export * from './video';

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

export interface RegCode {
  codeId: number;
  userId: number | null;
  realname: string;
  code: string;
  date: string;
}
