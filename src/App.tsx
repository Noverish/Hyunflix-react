import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import * as pages from 'pages';
import { auth } from './utils';

import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={pages.LoginPage} />
          <Route path="/register" component={pages.RegisterPage} />
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
          <Route exact path="/" render={ props => <Redirect to="/home" /> } />
          <Route path="/home" component={pages.HomePage} />
          <Route path="/movies/:movie_id" component={pages.MovieDetailPage} />
          <Route path="/movies/" component={pages.MovieListPage} />
          <Route path="/musics/" component={pages.MusicPage} />
          <Route path="/explorer/*" component={pages.ExplorerPage} />
          <Route path="/explorer/" component={pages.ExplorerPage} />
          <Route path="/encode/new" component={pages.EncodeNewPage} />
          <Route path="/encode/" component={pages.EncodePage} />
          <Route component={pages.NotFoundPage} />
        </Switch>
      ) 
    } else {
      return ( <Redirect to="/login"/> )
    }
  }
}

export default App;