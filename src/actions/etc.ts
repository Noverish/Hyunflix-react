import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { File } from 'models';

export const readdir = createAsyncAction(
  'READDIR_REQUEST',
  'READDIR_SUCCESS',
  'READDIR_FAILURE',
)<string, File[], string>();

export const windowResize = createStandardAction('WINDOW_RESIZE')<undefined>();
