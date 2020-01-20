import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { Music } from 'models';
import { SearchResult } from './';

export async function musicList(query: string, page: number, pageSize: number): Promise<SearchResult<Music>> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics`,
    method: 'get',
    params: { q: query, p: page, ps: pageSize },
  };

  return (await axios(config)).data;
}

export async function musicTagList(): Promise<string[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/musics/tags`,
    method: 'get',
  };

  return (await axios(config)).data;
}
