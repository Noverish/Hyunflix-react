import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const authString: string | null = localStorage.getItem('auth');
const persistedState = authString ? { auth: JSON.parse(authString) } : undefined;

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth));
});
