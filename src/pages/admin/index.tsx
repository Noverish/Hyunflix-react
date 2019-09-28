import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { NotFoundPage } from 'pages';
import ExplorerPage from './explorer/explorer';
import EncodePage from './encode/encode';
import RegisterCodePage from './register-code/register-code';
import VideoManagePage from './video/video-manage';
import VideoArticleEditPage from './video/video-article-edit';
import AdminLayout from './admin-layout';
import './index.css';

interface Props extends RouteComponentProps {
  isAdmin: boolean;
}

const AdminPage: React.FunctionComponent<Props> = (props) => {
  if (props.isAdmin) {
    return (
      <AdminLayout>
        <Switch>
          <Route path="/admin/explorer*" component={ExplorerPage} />
          <Route path="/admin/encode*" component={EncodePage} />
          <Route path="/admin/register-code*" component={RegisterCodePage} />
          <Route path="/admin/video-manage/edit" component={VideoArticleEditPage} />
          <Route path="/admin/video-manage" component={VideoManagePage} />
          <Route render={props => <Redirect to="/admin/explorer" /> } />
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
    isAdmin: state.auth.isAdmin,
  }
}

export default connect(mapStateToProps)(AdminPage);