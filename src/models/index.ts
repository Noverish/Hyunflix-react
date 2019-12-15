export * from './auth';
export * from './music';
export * from './video';
export * from './user';
export * from './comic';

export interface File {
  path: string;
  name: string;
  isdir: boolean;
  size: string;
  url: string;
}
