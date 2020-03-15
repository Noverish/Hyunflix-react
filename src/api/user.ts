import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { UserVideo } from 'models';
import { SearchResult } from '.';

export async function userVideoList(query: string, page: number, pageSize: number): Promise<SearchResult<UserVideo>> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/user/videos`,
    method: 'get',
    params: { q: query, p: page, ps: pageSize },
  };

  return (await axios(config)).data;
}

export async function userVideoOne(videoId: number): Promise<UserVideo | null> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/user/videos/${videoId}`,
    method: 'get',
    validateStatus(status: number) {
      return status === 200 || status === 404;
    },
  };

  const result = (await axios(config)).data;
  if (result.msg) {
    return null;
  }
  return result;
}

export async function deleteUserVideoBulk(videoIds: number[]): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/user/videos`,
    method: 'delete',
    data: { videoIds },
  };

  await axios(config);
}
