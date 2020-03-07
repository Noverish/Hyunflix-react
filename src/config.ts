export const PAGE_SIZE = 15;
export const LARGE_SEEK_RANGE = 60;
export const SMALL_SEEK_RANGE = 10;
export const VIDEO_SCREEN_RATIO = 9 / 16;

export const MOBILE_BREAKPOINT = 768;
export const USER_INPUT_DEBOUNCE = 500;
export const COLORS = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
export const REFRESH_TOKEN_HEADER = 'x-hyunsub-refresh-token';
export const ACCESS_TOKEN_HEADER = 'x-hyunsub-access-token';

const { protocol, hostname } = window.location;

export const SOCKET_SERVER = (process.env.NODE_ENV === 'development')
  ? `ws://${hostname}:8080/api/socket.io`
  : 'wss://api.hyunsub.kim/socket.io';

export const API_SERVER = (process.env.NODE_ENV === 'development')
  ? `${protocol}//${hostname}:8080/api`
  : 'https://api.hyunsub.kim';

export const AUTH_SERVER = (process.env.NODE_ENV === 'development')
  ? `${protocol}//${hostname}:8080/auth`
  : 'https://auth.hyunsub.kim';
