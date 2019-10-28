import { request } from './';
import { Music } from 'models';
import { stringify } from 'querystring';
import { FS_SERVER } from 'config';

export interface MusicListResult {
  total: number;
  results: Music[];
}

export async function musicList(query: string, page: number, pageSize: number): Promise<MusicListResult> {
  const querystring = stringify({ q: query, p: page, ps: pageSize });
  const url = `/musics?${querystring}`;
  const method = 'get';
  return await request(url, method);
}

export async function musicTagList(): Promise<string[]> {
  const url = '/musics/tags';
  const method = 'get';
  return await request(url, method);
}

export async function musicAdd(youtubeUrl: string, tags: string[]): Promise<void> {
  const url = `${FS_SERVER}/youtube`;
  const method = 'post';
  const payload = {
    tags,
    url: youtubeUrl,
    music: true,
    video: false,
  };
  return await request(url, method, payload);
}

export async function musicDelete(ids: number[], deleteFile: boolean): Promise<void> {
  const url = '/musics';
  const method = 'delete';
  const payload = { ids, deleteFile };
  await request(url, method, payload);
}

export async function musicExamine(): Promise<void> {
  const url = '/musics/examine';
  const method = 'post';
  return await request(url, method);
}
