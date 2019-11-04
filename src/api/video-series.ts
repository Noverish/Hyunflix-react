import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { VideoSeries } from 'models';

export async function videoSeriesList(): Promise<VideoSeries[]> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/series`,
    method: 'get',
  };

  return (await axios(config)).data;
}

export async function videoSeries(seriesId: number): Promise<VideoSeries> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/series/${seriesId}`,
    method: 'get',
  };

  return (await axios(config)).data;
}
