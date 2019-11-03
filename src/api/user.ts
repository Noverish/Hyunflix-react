import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { UserVideo } from 'models';

export async function userVideoList(userId: number): Promise<UserVideo[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/users/${userId}/videos`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function userVideo(userId: number, articleId: number): Promise<UserVideo> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/users/${userId}/videos/${articleId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function deleteUserVideoBulk(userId: number, articleIds: number[]): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/users/${userId}/videos`,
    method: 'delete',
    data: { articleIds },
  };

  await axios(config);
}
