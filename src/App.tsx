import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={ LoginPage }/>
        <Route path="/register" component={ RegisterPage }/>
        <Route path="/" component={ HomePage } />
      </Switch>
    );
  }
}

export default App;