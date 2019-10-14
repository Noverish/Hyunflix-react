import { request } from './';
import { File } from 'models';

export async function readdir(path): Promise<File[]> {
  const url = `/fs/readdir?path=${path}`;
  const method = 'get';
  return await request(url, method);
}
