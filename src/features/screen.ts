import { createSlice } from '@reduxjs/toolkit';
import { MOBILE_BREAKPOINT } from 'src/config';

interface State {
  isMobile: boolean;
  width: number;
  height: number;
}

const generateInitialState = (): State => ({
  isMobile: window.innerWidth <= MOBILE_BREAKPOINT,
  width: window.innerWidth,
  height: window.innerHeight
})

const screenSlice = createSlice({
  name: 'screen',
  initialState: generateInitialState(),
  reducers: {
    reload: generateInitialState,
  },
});

export const reducer = screenSlice.reducer;

export const actions = {
  ...screenSlice.actions,
}
