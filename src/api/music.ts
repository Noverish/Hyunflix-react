import { request } from './';
import { Music } from 'models';
import { YOUTUBE_SERVER } from 'config';

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

export async function musicAdd(urlParam: string): Promise<void> {
  const url = `${YOUTUBE_SERVER}`;
  const method = 'post';
  const payload = {
    url: urlParam,
    isMusic: true,
  }
  return await request(url, method, payload);
}