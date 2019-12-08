import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { MusicPlaylist } from 'models';

export async function listMusicPlaylist(): Promise<MusicPlaylist[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics/playlist`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function createMusicPlaylist(title: string): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics/playlist`,
    method: 'post',
    data: { title },
  };

  await axios(config);
}

export async function getMusicPlaylist(playlistId: number): Promise<MusicPlaylist> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics/playlist/${playlistId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function updateMusicPlaylist(playlistId: number, title?: string, musicIds?: number[]): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics/playlist/${playlistId}`,
    method: 'put',
    data: { title, musicIds },
  };

  await axios(config);
}

export async function deleteMusicPlaylist(playlistId: number): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics/playlist/${playlistId}`,
    method: 'delete',
  };

  await axios(config);
}
