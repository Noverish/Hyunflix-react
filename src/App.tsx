import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';

import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/archive" component={ HomePage }/>
        <Route path="/login" component={ LoginPage }/>
      </Switch>
    );
  }
}

export default App;