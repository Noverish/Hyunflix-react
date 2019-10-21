import { tokenExpire } from 'actions';
import { message } from 'antd';
import { store } from '../index';

import { API_SERVER } from 'config';
import { handleError, cookie } from 'utils';
const axios = require('axios');

export * from './ffmpeg';
export * from './auth';
export * from './music';
export * from './video';
export * from './user';
export * from './fs';

export async function request(path: string, method: string, data: any = undefined) {
  const url = path.startsWith('/') ? `${API_SERVER}${path}` : path;
  const headers = {};

  const token = cookie.getCookie('x-hyunsub-token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    return (await axios({ url, method, headers, data })).data;
  } catch (err) {
    console.log({
      message: err.message,
      response: err.response,
      config: err.config,
      request: err.request,
    });

    if (err.response && err.response.status === 401) {
      store.dispatch(tokenExpire());
    }

    let errMsg = '';

    if (err.response && err.response.data && err.response.data.msg) {
      errMsg = err.response.data.msg;
    } else if (err.response && err.response.data) {
      errMsg = JSON.stringify(err.response.data);
    } else {
      errMsg = err.message;
    }

    if (err.response && err.response.status === 500) {
      handleError(errMsg);
    } else {
      message.error(errMsg);
    }

    throw errMsg;
  }
}
