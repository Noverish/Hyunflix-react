import { request } from './';
import { FFMPEG_SERVER } from 'config';

export async function ffmpegPause() {
  const url = `${FFMPEG_SERVER}/pause`;
  const method = 'post';
  return await request(url, method);
}

export async function ffmpegResume() {
  const url = `${FFMPEG_SERVER}/resume`;
  const method = 'post';
  return await request(url, method);
}

export async function ffmpegIsRunning() {
  const url = `${FFMPEG_SERVER}/state`;
  const method = 'get';
  return (await request(url, method)).running === 'true';
}