import axios from 'axios';
import { join } from 'path';
import { ServerResponse } from '../models'

const BASE: string = 'home.hyunsub.kim:8080'

export async function get(path: string): Promise<ServerResponse> {
  path = encodeURI(path);
  const url = 'http://' + join(BASE, path);
  return (await axios.get(url)).data;
}

export async function login(id: string, password: string): Promise<string> {
  const url = `http://${BASE}/auth/login`;
  const body = { id, password }
  return (await axios.post(url, body)).data['token'];
}