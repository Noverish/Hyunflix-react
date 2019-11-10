import axios from 'axios';
import React from 'react';
import { notification, message } from 'antd';

import { store } from 'index';
import { tokenExpire } from 'actions';
import { cookie } from 'utils';

export * from './auth';
export * from './music';
export * from './video';
export * from './user';
export * from './video-series';

export interface SearchResult<T> {
  total: number;
  results: T[];
}

axios.interceptors.request.use((config) => {
  const token = cookie.getCookie('x-hyunsub-token');
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  return config;
}, (err) => {
  handleError(err.message, JSON.stringify(err.config, null, 4));
  return Promise.reject(err.message);
});

axios.interceptors.response.use((response) => {
  return response;
}, (err) => {
  const status: number = err.response.status;
  const data: any = err.response.data;
  const msg: string = (data.msg) ? data.msg : JSON.stringify(data);

  if (status === 401) {
    store.dispatch(tokenExpire());
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

// export async function request(path: string, method: Method, data: any = undefined, validateStatus: boolean = true) {
//   const url = path.startsWith('/') ? `${API_SERVER}${path}` : path;
//   const headers = {};

//   const token = cookie.getCookie('x-hyunsub-token');
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   try {
//     const config: AxiosRequestConfig = { url, method, headers, data };

//     if (!validateStatus) {
//       config.validateStatus = status => status < 500;
//     }

//     return (await axios(config)).data;
//   } catch (err) {
//     console.log({
//       message: err.message,
//       response: err.response,
//       config: err.config,
//       request: err.request,
//     });

//     if (err.response && err.response.status === 401) {
//       store.dispatch(tokenExpire());
//     }

//     let errMsg = '';

//     if (err.response && err.response.data && err.response.data.msg) {
//       errMsg = err.response.data.msg;
//     } else if (err.response && err.response.data) {
//       errMsg = JSON.stringify(err.response.data);
//     } else {
//       errMsg = err.message;
//     }

//     if (err.response && err.response.status === 500) {
//       handleError(errMsg);
//     } else {
//       message.error(errMsg);
//     }

//     throw errMsg;
//   }
// }
