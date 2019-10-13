import React from 'react';
import * as time from './time';
import * as cookie from './cookie';
import { notification } from 'antd';

function isString(err: string | Error): err is string {
  return typeof err === 'string';
}

function handleError(err: string | Error) {
  const description = (isString(err)) ? err : err.stack;

  notification.error({
    message: 'Error Occurred',
    description: React.createElement('pre', null, description),
    duration: 0,
    placement: 'topLeft',
    style:{ width: '80vw' },
  });
}

function resolution2Color(resolution: string) {
  const list = {
    '1080p': 'purple',
    '720p': 'geekblue',
    '480p': 'green',
    '360p': 'red',
  };

  return list[resolution];
}

export {
  time,
  cookie,
  handleError,
  resolution2Color,
};
