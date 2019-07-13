import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages-mobile/home';
import NotFoundPage from './pages-mobile/not-found';

import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/archive" component={ HomePage } />
        <Route exact path="/" render={() => (
            <Redirect to="/archive/Movies"/>
        )}/>
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default App;