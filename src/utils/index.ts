function resolution2Color(resolution: string) {
  const list = {
    '1080p': 'purple',
    '720p': 'geekblue',
    '480p': 'green',
    '360p': 'red',
  };

  return list[resolution];
}

function second2String(second: number) {
  const sec = second % 60;
  const min = (Math.floor(second / 60)) % 60;
  const hour = (Math.floor(second / 3600)) % 60;

  const results: string[] = [];

  if (hour) {
    results.push(`${hour}시간`);
  }

  if (min) {
    results.push(`${min}분`);
  }

  if (!hour && sec) {
    results.push(`${sec}초`);
  }

  return results.join(' ');
}

export {
  second2String,
  resolution2Color,
};
