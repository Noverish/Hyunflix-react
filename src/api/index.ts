import { File } from 'models'
import { message } from 'antd';
import { tokenExpire } from 'actions';
import { store } from '../index';

import { BACKEND_SERVER } from 'config';
const axios = require('axios');

export * from './ffmpeg';
export * from './auth';
export * from './music';
export * from './video';
export * from './user';

export async function request(path: string, method: string, data: any = undefined) {
  const url = path.startsWith('/') ? `${BACKEND_SERVER}${path}` : path;
  const headers = {};
  
  const token = store.getState().auth.token;
  if(token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  try {
    return (await axios({ url, method, headers, data })).data;
  } catch (err) {
    console.log({
      message: err.message,
      response: err.response,
      config: err.config,
      request: err.request,
    });
    
    if (err.response && err.response.status === 401) {
      store.dispatch(tokenExpire());
    }
    
    let errMsg = '';
    
    if (err.response && err.response.data && err.response.data.msg) {
      errMsg = err.response.data.msg;
    } else if (err.response && err.response.data) {
      errMsg = JSON.stringify(err.response.data);
    } else {
      errMsg = err.message;
    }
    
    message.error(errMsg);
    throw errMsg;
  }
}

export async function readdir(path: string): Promise<File[]> {
  const url = `/explorer/readdir`;
  const method = 'post';
  const body = { path }
  return await request(url, method, body);
}

export async function rename(fromPath: string, toPath: string) {
  const url = `/explorer/rename`;
  const method = 'post';
  const body = { fromPath, toPath }
  return await request(url, method, body);
}

export async function isdir(path: string): Promise<boolean> {
  const url = `/explorer/isdir`;
  const method = 'post';
  const body = { path }
  return (await request(url, method, body)).isdir;
}

export async function exists(path: string): Promise<boolean> {
  const url = `/explorer/exists`;
  const method = 'post';
  const body = { path }
  return (await request(url, method, body)).exists;
}
