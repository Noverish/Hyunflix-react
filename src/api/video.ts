import { request } from './';
import { VideoArticle, Subtitle } from 'models';

export async function videoArticleList(): Promise<VideoArticle[]> {
  const url = `/articles/videos`;
  const method = 'get';
  return await request(url, method);
}

export async function videoArticle(articleId: number): Promise<VideoArticle> {
  const url = `/articles/videos/${articleId}`;
  const method = 'get';
  return await request(url, method);
}

export async function videoTagList(): Promise<string[]> {
  const url = `/articles/videos/tags`;
  const method = 'get';
  return await request(url, method);
}

export async function videoSubtitleList(videoId: number): Promise<Subtitle[]> {
  const url = `/videos/${videoId}/subtitles`;
  const method = 'get';
  return await request(url, method);
}

export interface VideoArticleUpdateParams {
  videoArticleId: number;
  params: Partial<VideoArticle>;
}

export async function videoArticleUpdate(params: VideoArticleUpdateParams): Promise<void> {
  const url = `/articles/videos/${params.videoArticleId}`;
  const method = 'put';
  await request(url, method, params.params);
}