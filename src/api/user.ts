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

export async function userVideo(userId: number, videoId: number): Promise<UserVideo> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/users/${userId}/videos/${videoId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function deleteUserVideoBulk(userId: number, videoIds: number[]): Promise<void> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/users/${userId}/videos`,
    method: 'delete',
    data: { videoIds },
  };

  await axios(config);
}
