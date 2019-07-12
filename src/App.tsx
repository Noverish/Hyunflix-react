import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages-mobile/home';

import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ HomePage } />
      </Switch>
    );
  }
}

export default App;