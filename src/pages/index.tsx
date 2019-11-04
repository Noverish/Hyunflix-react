import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { musicTagListAsync, videoTagList } from 'actions';

import MainLayout from './main-layout';
import Home from './home/home';
import MusicAdd from './music/music-add';
import MusicList from './music/music-list';
import VideoContent from './video/video-content';
import VideoList from './video/video-list';
import VideoSeriesContent from './video/video-series-content';
import VideoSeriesList from './video/video-series-list';
import UserVideo from './user/user-video';
import PasswordChangePage from './user/password-change';
import NotFound from './not-found/not-found';

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

        <Route path="/videos/series/:category/:seriesId" component={VideoSeriesContent} />
        <Route path="/videos/series/:category" component={VideoSeriesList} />
        <Route path="/videos/:videoId" component={VideoContent} />
        <Route path="/videos" component={VideoList} />

        <Route path="/musics/add" component={MusicAdd} />
        <Route path="/musics" component={MusicList} />

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
