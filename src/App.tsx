import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from 'pages/login';
import NotFoundPage from './pages/not-found';
import { getToken } from './utils';

import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/"component={App2} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

class App2 extends Component {
  render() {
    if (getToken()) {
      return (
        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/archive" />
          )} />
          <Route path="/archive" component={ HomePage } />
          <Route path="/favorite" component={ HomePage } />
          <Route path="/settings" component={ HomePage } />
        </Switch>
      ) 
    } else {
      return ( <Redirect to="/login"/> )
    }
  }
}

export default App;