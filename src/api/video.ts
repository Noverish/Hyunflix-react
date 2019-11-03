import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { VideoArticle, Subtitle, VideoBundle } from 'models';

export interface VideoArticleListResult {
  total: number;
  results: VideoArticle[];
}

export async function videoArticleList(query: string, page: number, pageSize: number): Promise<VideoArticleListResult> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/articles/videos`,
    method: 'get',
    params: { q: query, p: page, ps: pageSize },
  };

  return (await axios(config)).data;
}

export async function videoArticle(articleId: number): Promise<VideoArticle> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/articles/videos/${articleId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function videoTagList(): Promise<string[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/articles/videos/tags`,
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

export async function videoBundleCategories(): Promise<string[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/bundles/videos/categories`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function videoBundleList(category: string): Promise<VideoBundle[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/bundles/videos/${category}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function videoBundle(category: string, bundleId: number): Promise<VideoBundle> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/bundles/videos/${category}/${bundleId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}
