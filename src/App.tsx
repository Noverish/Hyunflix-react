import 'antd/dist/antd.css';
import { debounce } from 'debounce';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { RootActions, RootState } from 'src/features';
import IndexPage from 'src/pages';
import Login from 'src/pages/auth/login';
import Register from 'src/pages/auth/register';
import './App.scss';

// TODO destroy vanta after login or register success
const App = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);

  const onWindowResize = useCallback(() => {
    dispatch(RootActions.screen.reload());
  }, [dispatch]);

  useEffect(() => {
    window.onresize = debounce(onWindowResize, 500);
  }, [onWindowResize]);

  const inner = (refreshToken)
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
  )
}

export default App;
