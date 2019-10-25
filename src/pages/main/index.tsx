import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { musicTagListAsync, videoTagList } from 'actions';

import MainLayout from './main-layout';
import Home from './home/home';
import MusicArticleAdd from './music/music-article-add';
import MusicArticleList from './music/music-article-list';
import VideoArticleContent from './video/video-article-content';
import VideoArticleList from './video/video-article-list';
import VideoBundleContent from './video/video-bundle-content';
import VideoBundleList from './video/video-bundle-list';
import UserVideo from './user-video/user-video';
import PasswordChangePage from './user/password-change';
import NotFound from 'pages/not-found';

interface Props {
  musicTagList: typeof musicTagListAsync.request;
  videoTagList: typeof videoTagList.request;
}

const MainPage: React.FunctionComponent<Props> = (props) => {
  const { musicTagList, videoTagList } = props;

  useEffect(() => {
    musicTagList();
    videoTagList();
  }, [musicTagList, videoTagList]);

  return (
    <MainLayout>
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact={true} path="/login" render={_ => <Redirect to="/home" />} />
        <Route exact={true} path="/register" render={_ => <Redirect to="/home" />} />
        <Route exact={true} path="/" render={_ => <Redirect to="/home" />} />

        <Route path="/videos/articles/:articleId" component={VideoArticleContent} />
        <Route path="/videos/articles" component={VideoArticleList} />
        <Route path="/videos/bundles/:category/:bundleId" component={VideoBundleContent} />
        <Route path="/videos/bundles/:category" component={VideoBundleList} />
        <Route exact={true} path="/videos" render={_ => <Redirect to="/videos/articles" />} />

        <Route path="/musics/articles/add" component={MusicArticleAdd} />
        <Route path="/musics/articles" component={MusicArticleList} />
        <Route exact={true} path="/musics" render={_ => <Redirect to="/musics/articles" />} />

        <Route path="/user/videos" component={UserVideo} />
        <Route path="/user/password-change" component={PasswordChangePage} />

        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
};

const mapDispatchToProps = {
  musicTagList: musicTagListAsync.request,
  videoTagList: videoTagList.request,
};

export default connect(undefined, mapDispatchToProps)(MainPage);
