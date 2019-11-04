import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { Video, Subtitle } from 'models';

export interface VideoListResult {
  total: number;
  results: Video[];
}

export async function videoList(query: string, page: number, pageSize: number): Promise<VideoListResult> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos`,
    method: 'get',
    params: { q: query, p: page, ps: pageSize },
  };

  return (await axios(config)).data;
}

export async function videoOne(videoId: number): Promise<Video> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/${videoId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function videoTagList(): Promise<string[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/tags`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function videoSubtitleList(videoId: number): Promise<Subtitle[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/${videoId}/subtitles`,
    method: 'get',
  };

  return (await axios(config)).data;
}
