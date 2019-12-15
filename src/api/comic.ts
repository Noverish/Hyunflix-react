import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { Comic } from 'models';
import { SearchResult } from './';

export async function listComic(query: string, page: number, pageSize: number): Promise<SearchResult<Comic>> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/comics`,
    method: 'get',
    params: { q: query, p: page, ps: pageSize },
  };

  return (await axios(config)).data;
}

export async function getComic(comicId): Promise<Comic> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/comics/${comicId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function listComicImg(comicId): Promise<string[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/comics/${comicId}/imgs`,
    method: 'get',
  };

  return (await axios(config)).data;
}
