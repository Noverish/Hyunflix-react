import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainLayout from './main-layout';
import Home from './home/home';
import MusicArticleAdd from './music/music-article-add';
import MusicArticleList from './music/music-article-list';
import VideoArticleContent from './video/video-article-content';
import VideoArticleList from './video/video-article-list';
import VideoBundleContent from './video/video-bundle-content';
import VideoBundleList from './video/video-bundle-list';
import NotFound from 'pages/not-found';

const MainPage: React.FunctionComponent = () => {
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

        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
};

export default MainPage;
