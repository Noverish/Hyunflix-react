import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { MovieListPage, MovieDetailPage, LoginPage, RegisterPage, NotFoundPage, HomePage } from 'pages';
import { auth } from './utils';

import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={NotFoundPage} />
          <Route path="/"component={App2} />
        </Switch>
      </BrowserRouter>
    );
  }
}

class App2 extends Component {
  render() {
    if (auth.getToken()) {
      return (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movies/*" component={MovieDetailPage} />
          <Route path="/movies/" component={MovieListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      ) 
    } else {
      return ( <Redirect to="/login"/> )
    }
  }
}

export default App;