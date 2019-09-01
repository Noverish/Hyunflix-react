export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAIL = 'TOKEN_FAIL';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';

export const login = (username, password) => ({
  type: LOGIN,
  username, password
});

export const logout = () => ({
  type: LOGOUT,
});

export const register = (username, password, regCode) => ({
  type: REGISTER,
  username, password, regCode
});

export const tokenSuccess = (token) => ({
  type: TOKEN_SUCCESS,
  token
})

export const tokenFail = (errMsg) => ({
  type: TOKEN_FAIL,
  errMsg
})

export const tokenExpire = () => ({
  type: TOKEN_EXPIRE,
})