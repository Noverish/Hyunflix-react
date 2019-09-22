import { request } from './';
import { Music } from 'models';

export async function musicList(): Promise<Music[]> {
  const url = `/musics`;
  const method = 'get';
  return await request(url, method);
}

export async function musicTagList(): Promise<string[]> {
  const url = `/musics/tags`;
  const method = 'get';
  return await request(url, method);
}