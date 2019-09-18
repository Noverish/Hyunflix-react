import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { NotFoundPage } from 'pages';
import ExplorerPage from './explorer/explorer';
import EncodePage from './encode/encode';
import RegisterCodePage from './register-code/register-code';
import AdminLayout from './admin-layout';
import './index.css';

interface Props extends RouteComponentProps {
  userId: number;
}

const AdminPage: React.FunctionComponent<Props> = (props) => {
  if (props.userId === 1) {
    return (
      <AdminLayout>
        <Switch>
          <Route path="/admin/explorer*" component={ExplorerPage} />
          <Route path="/admin/encode*" component={EncodePage} />
          <Route path="/admin/register-code*" component={RegisterCodePage} />
          <Route render={props => <Redirect to="/admin/explorer" />} />
        </Switch>
      </AdminLayout>
    )
  } else {
    return (
      <NotFoundPage />
    )
  }
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps)(AdminPage);