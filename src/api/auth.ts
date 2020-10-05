import axios, { AxiosRequestConfig } from 'axios';
import NodeRSA from 'node-rsa';

import { AUTH_SERVER, ACCESS_TOKEN_HEADER } from 'src/config';
import { LoginParam, RegisterParam, LoginResult } from 'src/models';

export async function getRSAKey(): Promise<string> {
  const config: AxiosRequestConfig = {
    url: `${AUTH_SERVER}/rsa-key`,
    method: 'get',
  };

  return (await axios(config)).data.key;
}

export async function login(param: LoginParam): Promise<LoginResult> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');

  const config: AxiosRequestConfig = {
    url: `${AUTH_SERVER}/login`,
    method: 'post',
    data: {
      username: publicKey.encrypt(param.username, 'base64'),
      password: publicKey.encrypt(param.password, 'base64'),
    },
  };

  return (await axios(config)).data;
}

export async function register(param: RegisterParam): Promise<LoginResult> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');

  const config: AxiosRequestConfig = {
    url: `${AUTH_SERVER}/register`,
    method: 'post',
    data: {
      username: publicKey.encrypt(param.username, 'base64'),
      password: publicKey.encrypt(param.password, 'base64'),
      regCode: publicKey.encrypt(param.regCode, 'base64'),
    },
  };

  return (await axios(config)).data;
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');

  const config: AxiosRequestConfig = {
    url: `${AUTH_SERVER}/change-password`,
    method: 'post',
    data: {
      oldPassword: publicKey.encrypt(oldPassword, 'base64'),
      newPassword: publicKey.encrypt(newPassword, 'base64'),
    },
  };

  await axios(config);
}

export async function reissueAccessToken(accessToken: string): Promise<string> {
  const config: AxiosRequestConfig = {
    url: `${AUTH_SERVER}/reissue-access-token`,
    method: 'post',
    data: {
      [ACCESS_TOKEN_HEADER]: accessToken,
    },
  };

  return (await axios(config)).data['accessToken'];
}
