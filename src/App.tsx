import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as pages from 'pages';

import 'antd/dist/antd.css';
import './App.css';

interface Props {
  token: string;
}

interface State {
  
}

class App extends Component<Props, State> {
  render() {
    let inner = (this.props.token)
      ? (
        <Switch>
          <Route path="/login" render={ props => <Redirect to="/home" /> } />
          <Route path="/register" render={ props => <Redirect to="/home" /> } />
          <Route exact path="/" render={ props => <Redirect to="/home" /> } />
          <Route path="/home" component={pages.HomePage} />
          <Route path="/movies/:movie_id" component={pages.MovieDetailPage} />
          <Route path="/movies/" component={pages.MovieListPage} />
          <Route path="/musics/" component={pages.MusicPage} />
          
          <Route path="/explorer" component={pages.AdminPage} />
          <Route path="/encode" component={pages.AdminPage} />
          
          <Route component={pages.NotFoundPage} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={pages.LoginPage} />
          <Route path="/register" component={pages.RegisterPage} />
          <Route render={ props => <Redirect to="/login" /> } />
        </Switch>
      );
    
    return (
      <BrowserRouter>
        {inner}
      </BrowserRouter>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
}

export default connect(mapStateToProps)(App);
