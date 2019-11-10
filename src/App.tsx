import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { debounce } from 'debounce';

import IndexPage from 'pages';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';

import { windowResize } from 'actions';
import 'antd/dist/antd.css';
import './App.scss';

interface Props {
  windowResize(): ReturnType<typeof windowResize>;
  token: string;
}

interface State {

}

class App extends Component<Props, State> {
  componentDidMount() {
    window.onresize = debounce(this.props.windowResize, 500);
  }

  render() {
    const inner = (this.props.token)
      ? (
        <Switch>
          <Route component={IndexPage} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route render={_ => <Redirect to="/login" />} />
        </Switch>
      );

    return (
      <BrowserRouter>
        {inner}
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = {
  windowResize,
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
