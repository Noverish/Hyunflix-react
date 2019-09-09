import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const persistedState = localStorage.getItem('redux.state.auth') ? JSON.parse(localStorage.getItem('redux.state.auth')!) : {}

// TODO https://github.com/LogRocket/redux-logger/issues/6
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducer,
  { auth: persistedState },
  applyMiddleware(sagaMiddleware),
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