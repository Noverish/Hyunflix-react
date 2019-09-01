import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const persistedState = localStorage.getItem('redux.state.auth') ? JSON.parse(localStorage.getItem('redux.state.auth')!) : {}

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducer,
  { auth: persistedState },
  applyMiddleware(sagaMiddleware, logger),
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

store.subscribe(()=>{
  localStorage.setItem('redux.state.auth', JSON.stringify(store.getState().auth))
})