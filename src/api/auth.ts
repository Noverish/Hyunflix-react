import * as NodeRSA from 'node-rsa';

import { request } from './';
import { AUTH_SERVER } from 'config';

export async function getRSAKey(): Promise<string> {
  const url = `${AUTH_SERVER}/rsa-key`;
  const method = 'get';
  return (await request(url, method)).key;
}

export async function login(username: string, password: string): Promise<string> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');
  
  const url = `${AUTH_SERVER}/login`;
  const method = 'post';
  const body = {
    username: publicKey.encrypt(username, 'base64'),
    password: publicKey.encrypt(password, 'base64'),
  }
  return (await request(url, method, body)).token;
}

export async function register(username: string, password: string, register_code: string): Promise<string> {
  const publicKeyString: string = await getRSAKey();
  const publicKey = new NodeRSA(publicKeyString, 'pkcs8-public');
  
  const url = `${AUTH_SERVER}/register`;
  const method = 'post';
  const body = {
    username: publicKey.encrypt(username, 'base64'),
    password: publicKey.encrypt(password, 'base64'),
    reg_code: publicKey.encrypt(register_code, 'base64'),
  }
  return (await request(url, method, body)).token;
}