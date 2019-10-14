import { createStandardAction } from 'typesafe-actions';

export const windowResize = createStandardAction('WINDOW_RESIZE')<undefined>();
