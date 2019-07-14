import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';

import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (
            <Redirect to="/archive"/>
        )}/>
        <Route path="/archive" component={ HomePage } />
        <Route path="/favorite" component={ HomePage } />
        <Route path="/settings" component={ HomePage } />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default App;