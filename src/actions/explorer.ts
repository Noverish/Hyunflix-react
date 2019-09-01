import { File } from 'models';

export const READDIR = "READDIR";
export const READDIR_SUCCESS = "READDIR_SUCCESS";
export const READDIR_FAIL = "READDIR_FAIL";

export const readdir = (path: string) => ({
  type: READDIR,
  path: path
});

export const readdirSuccess = (files: File[]) => ({
  type: READDIR_SUCCESS,
  files: files
});

export const readdirFail = (errMsg: string) => ({
  type: READDIR_FAIL,
  errMsg: errMsg
});
