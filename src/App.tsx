import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { debounce } from 'debounce';

import IndexPage from 'pages';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import { RootState } from 'reducers';

import { windowResize } from 'actions';
import 'antd/dist/antd.css';
import './App.scss';

interface Props {
  windowResize(): ReturnType<typeof windowResize>;
  refreshToken: string;
}

interface State {

}

// TODO destroy vanta after login or register success
class App extends Component<Props, State> {
  componentDidMount() {
    window.onresize = debounce(this.props.windowResize, 500);
  }

  render() {
    const inner = (this.props.refreshToken)
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

const mapStateToProps = (state: RootState) => ({
  refreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
