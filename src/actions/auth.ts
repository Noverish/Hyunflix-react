export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';

export interface LoginAction {
  type: typeof LOGIN;
  username: string;
  password: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface RegisterAction {
  type: typeof REGISTER;
  username: string;
  password: string;
  regCode: string;
}

export interface TokenSuccessAction {
  type: typeof TOKEN_SUCCESS;
  token: string;
}

export interface TokenExpireAction {
  type: typeof TOKEN_EXPIRE;
}

export function login(username: string, password: string): LoginAction {
  return {
    type: LOGIN,
    username, password,
  }
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  }
}

export function register(username: string, password: string, regCode: string): RegisterAction {
  return {
    type: REGISTER,
    username, password, regCode,
  }
}

export function tokenSuccess(token: string): TokenSuccessAction {
  return {
    type: TOKEN_SUCCESS,
    token,
  }
}

export function tokenExpire(): TokenExpireAction {
  return {
    type: TOKEN_EXPIRE,
  }
}
