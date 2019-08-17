import { MoviePreview, MovieDetail, File, Encode } from 'models'
const axios = require('axios');

const SERVER: string = 'http://home.hyunsub.kim:8080';

async function request(path: string, method: string, data: any = undefined) {
  const url = `${SERVER}${path}`;
  
  try {
    return (await axios({ url, method, data })).data;
  } catch (err) {
    
    console.log(err.response);
    // console.log(err.config);
    // console.log(err.request);
    // console.log(err.message);
    
    if (err.response && err.response.data && err.response.data.msg) {
      throw err.response.data.msg;
    } else if (err.response && err.response.data) {
      throw JSON.stringify(err.response.data);
    } else if (err.response) {
      throw JSON.stringify(err.response);
    } else if (err.request) {
      throw JSON.stringify(err.request);
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

export async function getMovieDetail(path: string): Promise<MovieDetail> {
  const url = `/movies${path}`;
  const method = 'get';
  return await request(url, method);
}

export async function login(username: string, password: string): Promise<string> {
  const url = `/auth/login`;
  const method = 'post';
  const body = { username, password }
  return (await request(url, method, body)).token;
}

export async function register(username: string, password: string, register_code: string): Promise<string> {
  const url = `/auth/register`;
  const method = 'post';
  const body = { username, password, register_code }
  return (await request(url, method, body)).token;
}

export async function readdir(path: string): Promise<File[]> {
  const url = `/explorer/readdir`;
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