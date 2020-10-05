import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as Api from 'src/api';
import { LoginParam, LoginResult, RegisterParam } from 'src/models';

interface State {
  accessToken: string;
  refreshToken: string;
  username: string;
}

const initialState: State = {
  accessToken: '',
  refreshToken: '',
  username: '',
}

const loginRequest = createAction<LoginParam>('auth/login');
const registerRequest = createAction<RegisterParam>('auth/register');

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<State>>) => ({ ...state, ...action.payload }),
    clear: () => initialState,
  },
});

export const reducer = slice.reducer;

export const actions = {
  ...slice.actions,
  loginRequest,
  registerRequest,
}

function* fetchLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const result: LoginResult = yield call([Api, 'login'], action.payload);
    yield put(actions.set({ ...result, username: action.payload.username }));
  } catch (errMsg) {
    
  }
}

function* fetchRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const result: LoginResult = yield call([Api, 'register'], action.payload);
    yield put(actions.set({ ...result, username: action.payload.username }));
  } catch (errMsg) {
    
  }
}

function* watchLogin() {
  yield takeEvery(loginRequest.type, fetchLogin);
}

function* watchRegister() {
  yield takeEvery(registerRequest.type, fetchRegister);
}

export const sagas = [
  watchLogin(),
  watchRegister(),
];
