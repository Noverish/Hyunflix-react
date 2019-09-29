import { request } from './';
import { FFMPEG_SERVER } from 'config';
import { Encode } from 'models'

export async function ffmpegPause() {
  const url = `${FFMPEG_SERVER}/ffmpeg/pause`;
  const method = 'post';
  return await request(url, method);
}

export async function ffmpegResume() {
  const url = `${FFMPEG_SERVER}/ffmpeg/resume`;
  const method = 'post';
  return await request(url, method);
}

export async function ffmpegIsRunning() {
  const url = `${FFMPEG_SERVER}/ffmpeg/state`;
  const method = 'get';
  return (await request(url, method)).running === 'true';
}

export async function encodeStatus(): Promise<Encode[]> {
  const url = `${FFMPEG_SERVER}/encode/status`;
  const method = 'get';
  return await request(url, method);
}

export async function encodeFile(inpath: string, options: string, outpath: string) {
  const url = `${FFMPEG_SERVER}/encode`;
  const method = 'post';
  const body = { inpath, options, outpath };
  return await request(url, method, body);
}

export async function encodePresets() {
  const url = `${FFMPEG_SERVER}/encode/presets`;
  const method = 'get';
  return await request(url, method);
}