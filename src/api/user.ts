import { request } from './';
import { UserVideo } from 'models';

export async function userVideoList(userId: number): Promise<UserVideo[]> {
  const url = `/users/${userId}/videos`;
  const method = 'get';
  return await request(url, method);
}

export async function userVideo(userId: number, articleId: number): Promise<UserVideo | null> {
  const url = `/users/${userId}/videos/${articleId}`;
  const method = 'get';
  const payload = await request(url, method, undefined, false);
  if (payload.msg) {
    return null;
  } else {
    return payload as UserVideo;
  }
}
