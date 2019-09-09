import { Movie, Video, File, Encode } from 'models'
import { message } from 'antd';
import { tokenExpire } from 'actions';
import * as NodeRSA from 'node-rsa';
import { store } from '../index';
const axios = require('axios');

export const SERVER: string = 'http://home.hyunsub.kim:8080';

async function request(path: string, method: string, data: any = undefined) {
  const url = `${SERVER}${path}`;
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

export async function getMoviePreviewList(): Promise<Movie[]> {
  const url = `/movies`;
  const method = 'get';
  return await request(url, method);
}

export async function getMovieDetail(movie_id: number): Promise<Video> {
  const url = `/movies/${movie_id}`;
  const method = 'get';
  return await request(url, method);
}

export async function getRSAKey(): Promise<string> {
  const url = '/auth/rsa-key';
  const method = 'get';
  return (await request(url, method)).key;
}

export async function login(username: string, password: string): Promise<string> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');
  
  const url = `/auth/login`;
  const method = 'post';
  const body = {
    username: publicKey.encrypt(username, 'base64'),
    password: publicKey.encrypt(password, 'base64'),
  }
  return (await request(url, method, body)).token;
}

export async function register(username: string, password: string, register_code: string): Promise<string> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');
  
  const url = `/auth/register`;
  const method = 'post';
  const body = {
    username: publicKey.encrypt(username, 'base64'),
    password: publicKey.encrypt(password, 'base64'),
    reg_code: publicKey.encrypt(register_code, 'base64'),
  }
  return (await request(url, method, body)).token;
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

export async function video(path: string): Promise<Video> {
  const url = `/explorer/video`;
  const method = 'post';
  const body = { path }
  return await request(url, method, body);
}

export async function encodeStatus(): Promise<Encode[]> {
  const url = `/encode/status`;
  const method = 'get';
  return await request(url, method);
}

export async function encodeFile(inpath: string, options: string, outpath: string) {
  const url = `/encode`;
  const method = 'post';
  const body = { inpath, options, outpath };
  return await request(url, method, body);
}

export async function pauseEncoding() {
  const url = `/encode/pause`;
  const method = 'post';
  return await request(url, method);
}

export async function resumeEncoding() {
  const url = `/encode/resume`;
  const method = 'post';
  return await request(url, method);
}

export async function getAllMusics() {
  const url = `/musics`;
  const method = 'get';
  return await request(url, method);
}

export async function encodePresets() {
  const url = `/encode/presets`;
  const method = 'get';
  return await request(url, method);
}

export async function seriesList() {
  const url = `/tv-programs`;
  const method = 'get';
  return await request(url, method);
}

export async function episodeList(series: string) {
  const url = `/tv-programs/${series}`;
  const method = 'get';
  return await request(url, method);
}

export async function episodeDetail(series: string, episodeNumber: Number) {
  const url = `/tv-programs/${series}/${episodeNumber}`;
  const method = 'get';
  console.log(url);
  return await request(url, method);
}