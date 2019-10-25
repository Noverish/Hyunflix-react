import * as NodeRSA from 'node-rsa';

import { request } from './';
import { AUTH_SERVER } from 'config';
import { RegCode, LoginParam, RegisterParam, LoginResult } from 'models';

export async function getRSAKey(): Promise<string> {
  const url = `${AUTH_SERVER}/rsa-key`;
  const method = 'get';
  return (await request(url, method)).key;
}

export async function login(param: LoginParam): Promise<LoginResult> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');

  const url = `${AUTH_SERVER}/login`;
  const method = 'post';
  const body = {
    username: publicKey.encrypt(param.username, 'base64'),
    password: publicKey.encrypt(param.password, 'base64'),
  };
  return await request(url, method, body);
}

export async function register(param: RegisterParam): Promise<LoginResult> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');

  const url = `${AUTH_SERVER}/register`;
  const method = 'post';
  const body = {
    username: publicKey.encrypt(param.username, 'base64'),
    password: publicKey.encrypt(param.password, 'base64'),
    reg_code: publicKey.encrypt(param.regCode, 'base64'),
  };
  return await request(url, method, body);
}

export async function regCodeList(): Promise<RegCode[]> {
  const url = `${AUTH_SERVER}/register-codes`;
  const method = 'get';
  return await request(url, method);
}

export async function regCodeAdd(realname: string, code: string): Promise<RegCode> {
  const url = `${AUTH_SERVER}/register-codes`;
  const method = 'post';
  const body = { realname, code };
  return await request(url, method, body);
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');

  const url = `${AUTH_SERVER}/change-password`;
  const method = 'post';
  const body = {
    oldPassword: publicKey.encrypt(oldPassword, 'base64'),
    newPassword: publicKey.encrypt(newPassword, 'base64'),
  };
  await request(url, method, body);
}
