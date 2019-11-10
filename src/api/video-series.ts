import axios, { AxiosRequestConfig } from 'axios';

import { API_SERVER } from 'config';
import { VideoSeries } from 'models';
import { SearchResult } from './';

export async function videoSeriesList(query: string, page: number, pageSize: number): Promise<SearchResult<VideoSeries>> {
  const config: AxiosRequestConfig = {
    url: `${API_SERVER}/videos/series`,
    method: 'get',
    params: { q: query, p: page, ps: pageSize },
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
