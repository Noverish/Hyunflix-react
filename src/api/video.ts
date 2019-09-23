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