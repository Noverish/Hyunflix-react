const tokenKey = 'x-hyunsub-token';

export function setToken(token: string) {
  sessionStorage.setItem(tokenKey, token);
}

export function getToken(): string | null {
  return sessionStorage.getItem(tokenKey);
}