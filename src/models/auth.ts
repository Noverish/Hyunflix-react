export interface LoginParam {
  username: string;
  password: string;
}

export interface RegisterParam {
  username: string;
  password: string;
  regCode: string;
}

export interface LoginResult {
  token: string;
  userId: number;
  authority: string[];
}
