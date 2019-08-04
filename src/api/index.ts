import axios from 'axios';
import { MoviePreview, MovieDetail } from 'models'

const SERVER: string = 'http://home.hyunsub.kim:8091';

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