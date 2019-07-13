import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages-mobile/home';

import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    return (
      <Route path="/archive" component={ HomePage } />
    );
  }
}

export default App;