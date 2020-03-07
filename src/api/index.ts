import axios from 'axios';
import React from 'react';
import { notification, message } from 'antd';

import { store } from 'index';
import { refreshTokenExpireAction } from 'actions';
import { AUTH_SERVER, API_SERVER, ACCESS_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from 'config';

export * from './auth';
export * from './music';
export * from './video';
export * from './user';
export * from './video-series';
export * from './music-playlist';
export * from './comic';

export interface SearchResult<T> {
  total: number;
  results: T[];
}

axios.interceptors.request.use((config) => {
  if (config.url?.startsWith(AUTH_SERVER)) {
    config.headers[REFRESH_TOKEN_HEADER] = store.getState().auth.refreshToken;
  } else if (config.url?.startsWith(API_SERVER)) {
    config.headers[ACCESS_TOKEN_HEADER] = store.getState().auth.accessToken;
  }

  return config;
}, (err) => {
  handleError(err.message, JSON.stringify(err.config, null, 4));
  return Promise.reject(err.message);
});

axios.interceptors.response.use((response) => {
  return response;
}, (err) => {
  if (err.response === undefined) {
    handleError(err.message, JSON.stringify(err.config, null, 4));
    return Promise.reject(err.message);
  }

  const status: number = err.response.status;
  const data: any = err.response.data;
  const msg: string = (data.msg) ? data.msg : JSON.stringify(data);

  if (status === 401) {
    store.dispatch(refreshTokenExpireAction());
  } else if (status === 500) {
    const lines = msg.split('\n');
    handleError(lines.shift() || '', lines.join('\n'));
  } else {
    message.error(msg);
  }

  return Promise.reject(msg);
});

function handleError(title: string, content: string) {
  notification.error({
    message: title,
    description: React.createElement('pre', null, content),
    duration: 0,
    placement: 'topLeft',
    style:{ width: '80vw' },
  });
}
