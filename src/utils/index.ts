import * as time from './time';
import * as cookie from './cookie';

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
  resolution2Color,
};
