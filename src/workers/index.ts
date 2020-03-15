import { store } from 'src';
import { reissueAccessTokenAction } from 'src/actions';

export function registerReissueAccessTokenAction(accessToken: string) {
  const payload: { exp: number, iat: number } = JSON.parse(atob(accessToken.split('.')[1]));
  const timeout: number = (payload.exp - payload.iat) * 500;

  setTimeout(() => {
    store.dispatch(reissueAccessTokenAction.request(accessToken));
  }, timeout);
}
