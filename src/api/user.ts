import { request } from './';
import { UserVideo } from 'models';

export async function userVideoList(userId: number): Promise<UserVideo[]> {
  const url = `/users/${userId}/videos`;
  const method = 'get';
  return await request(url, method);
}
