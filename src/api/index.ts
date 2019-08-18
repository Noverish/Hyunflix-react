import { MoviePreview, Video, File, Encode } from 'models'
import * as NodeRSA from 'node-rsa';
import { auth } from 'utils';
const axios = require('axios');

const SERVER: string = 'http://home.hyunsub.kim:8080';

async function request(path: string, method: string, data: any = undefined) {
  const url = `${SERVER}${path}`;
  const headers = {};
  
  if(auth.getToken()) {
    headers['Authorization'] = 'Bearer ' + auth.getToken()
  }
  
  try {
    return (await axios({ url, method, headers, data })).data;
  } catch (err) {
    console.log(err.config);
    
    if (err.response.status === 401) {
      auth.clearToken();
    }
    
    if (err.response && err.response.data && err.response.data.msg) {
      throw err.response.data.msg;
    } else if (err.response && err.response.data) {
      throw JSON.stringify(err.response.data);
    } else {
      throw err.message;
    }
  }
}

export async function getMoviePreviewList(): Promise<MoviePreview[]> {
  const url = `/movies`;
  const method = 'get';
  return await request(url, method);
}

export async function getMovieDetail(path: string): Promise<Video> {
  const url = `/movies${path}`;
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
    register_code: publicKey.encrypt(register_code, 'base64'),
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

export async function encodeFile(target: string) {
  const url = `/encode/file`;
  const method = 'post';
  const body = { target }
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