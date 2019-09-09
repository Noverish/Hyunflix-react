import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ExplorerPage from './explorer/explorer';
import EncodePage from './encode/encode';
import AdminLayout from './admin-layout';
import './index.css';

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <AdminLayout>
        <Switch>
          <Route path="/explorer*" component={ExplorerPage} />
          <Route path="/encode" component={EncodePage} />
          <Route render={props => <Redirect to="/explorer" />} />
        </Switch>
      </AdminLayout>
    );
  }
}

export default SiderDemo;