import { request } from './';
import { VideoArticle, Subtitle } from 'models';

export async function videoArticleList(): Promise<VideoArticle[]> {
  const url = `/articles/videos`;
  const method = 'get';
  return await request(url, method);
}

export interface VideoArticleContentResult {
  article: VideoArticle;
  subtitles: Subtitle[];
}

export async function videoArticleContent(articleId: number): Promise<VideoArticleContentResult> {
  const url = `/articles/videos/${articleId}`;
  const method = 'get';
  return await request(url, method);
}

export async function videoTagList(): Promise<string[]> {
  const url = `/articles/videos/tags`;
  const method = 'get';
  return await request(url, method);
}

export interface VideoUpdateParams {
  from: string;
  to: string;
  isRegex: boolean;
  path: string;
  isDryrun: boolean;
}

export interface VideoUpdateResult {
  origins: string[];
  updates: string[];
}

export async function videoUpdate(params: VideoUpdateParams): Promise<VideoUpdateResult> {
  const url = `/articles/videos/update`;
  const method = 'post';
  return (await request(url, method, params)) as VideoUpdateResult;
}