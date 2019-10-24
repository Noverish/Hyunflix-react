import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from 'pages/not-found';
import EncodePage from './encode/encode';
import EncodeAddPage from './encode/encode-add';
import RegisterCodePage from './register-code/register-code';
import VideoManagePage from './video/video-manage';
import VideoArticleEditPage from './video/video-article-edit';
import VideoExaminePage from './video/video-examine';
import MusicExaminePage from './music-examine/music-examine';
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
          <Route path="/admin/encode/add" component={EncodeAddPage} />
          <Route path="/admin/encode*" component={EncodePage} />
          <Route path="/admin/register-code*" component={RegisterCodePage} />
          <Route path="/admin/video-manage/edit" component={VideoArticleEditPage} />
          <Route path="/admin/video-manage" component={VideoManagePage} />
          <Route path="/admin/video/examine" component={VideoExaminePage} />
          <Route path="/admin/music/examine" component={MusicExaminePage} />
          <Route render={_ => <Redirect to="/admin/encode" />} />
        </Switch>
      </AdminLayout>
    );
  }

  return (
    <NotFound />
  );
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapStateToProps)(AdminPage);
