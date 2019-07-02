import axios from 'axios';
import { join } from 'path';
import { ServerResponse } from '../models'

const BASE: string = 'home.hyunsub.kim:8080'

export async function get(path: string): Promise<ServerResponse> {
  path = encodeURI(path);
  const url = 'http://' + join(BASE, path);
  console.log(`url: ${url}`);
  return (await axios.get(url)).data;
}