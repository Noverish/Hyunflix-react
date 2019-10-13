import { request } from './';
import { Music } from 'models';
import { FFMPEG_SERVER } from 'config';

export async function musicList(): Promise<Music[]> {
  const url = '/musics';
  const method = 'get';
  return await request(url, method);
}

export async function musicTagList(): Promise<string[]> {
  const url = '/musics/tags';
  const method = 'get';
  return await request(url, method);
}

export async function musicAdd(youtubeUrl: string, tags: string[]): Promise<void> {
  const url = `${FFMPEG_SERVER}/youtube`;
  const method = 'post';
  const payload = {
    tags,
    url: youtubeUrl,
    music: true,
    video: false,
  };
  return await request(url, method, payload);
}
