import axios from 'axios';
import { MoviePreview, MovieDetail, File, Encode } from 'models'

const SERVER: string = 'http://home.hyunsub.kim:8080';

export async function getMoviePreviewList(): Promise<MoviePreview[]> {
  const url = `${SERVER}/movies`;
  return (await axios.get(url)).data;
}

export async function getMovieDetail(path: string): Promise<MovieDetail> {
  const url = `${SERVER}/movies${path}`;
  return (await axios.get(url)).data;
}

// export async function get(path: string): Promise<MoviePreview> {
  
//   const url = 'http://' + join(BASE, path);
// }

export async function login(username: string, password: string): Promise<string> {
  const url = `${SERVER}/auth/login`;
  const body = { username, password }
  return (await axios.post(url, body)).data['token'];
}

export async function register(username: string, password: string, register_code: string): Promise<string> {
  const url = `${SERVER}/auth/register`;
  const body = { username, password, register_code }
  return (await axios.post(url, body)).data['token'];
}

export async function readdir(path: string): Promise<File[]> {
  try {
    const url = `${SERVER}/explorer/readdir`;
    const body = { path }
    return (await axios.post(url, body)).data;
  } catch (err) {
    if (err.response) {
      throw { msg: err.response.data.msg, status: err.response.status };
    }
    throw err;
  }
}

export async function encodeStatus(): Promise<Encode[]> {
  const url = `${SERVER}/encode/status`;
  return (await axios.get(url)).data;
}

export async function encodeFile(target: string) {
  const url = `${SERVER}/encode/file`;
  const body = { target }
  await axios.post(url, body);
  return;
}

export async function pauseEncoding() {
  const url = `${SERVER}/encode/pause`;
  await axios.get(url);
  return;
}

export async function resumeEncoding() {
  const url = `${SERVER}/encode/resume`;
  await axios.get(url);
  return;
}