import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { musicTagListAsync, videoTagList } from 'actions';

import MainLayout from './main-layout';
import Home from './home/home';
import MusicList from './music/music-list';
import MusicPlaylist from './music/music-playlist';
import MusicplaylistEdit from './music/music-playlist-edit';
import MusicplaylistMusics from './music/music-playlist-musics';
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

        <Route path="/videos/series/:seriesId" component={VideoSeriesContent} />
        <Route path="/videos/series" component={VideoSeriesList} />
        <Route path="/videos/:videoId" component={VideoContent} />
        <Route path="/videos" component={VideoList} />

        <Route path="/musics/playlist/:playlistId/edit" component={MusicplaylistEdit} />
        <Route path="/musics/playlist/:playlistId/musics" component={MusicplaylistMusics} />
        <Route path="/musics/playlist/:playlistId" component={MusicPlaylist} />
        <Route path="/musics/playlist" component={MusicPlaylist} />
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
