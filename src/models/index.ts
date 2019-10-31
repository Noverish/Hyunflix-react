export * from './auth';
export * from './music';
export * from './video';
export * from './user';

export interface File {
  path: string;
  name: string;
  isdir: boolean;
  size: string;
  url: string;
}

export interface RegCode {
  id: number;
  userId: number | null;
  realname: string;
  code: string;
  date: string;
}
