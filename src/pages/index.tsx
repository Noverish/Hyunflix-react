import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { musicTagListAsync, videoTagList } from 'actions';
import { RouteWithLayout } from 'components';

import Home from './home/home';

import MusicList from './music/music-list';
import MusicPlaylist from './music/music-playlist';
import MusicplaylistEdit from './music/music-playlist-edit';
import MusicplaylistMusics from './music/music-playlist-musics';

import VideoContent from './video/video-content';
import VideoList from './video/video-list';
import VideoSeriesContent from './video/video-series-content';
import VideoSeriesList from './video/video-series-list';

import ComicList from './comic/comic-list';
import ComicContent from './comic/comic-content';

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
    <Switch>
      <RouteWithLayout exact={true} path="/" component={Home} />
      <RouteWithLayout exact={true} path="/login" render={_ => <Redirect to="/" />} />
      <RouteWithLayout exact={true} path="/register" render={_ => <Redirect to="/" />} />

      <RouteWithLayout path="/videos/series/:seriesId" component={VideoSeriesContent} />
      <RouteWithLayout path="/videos/series" component={VideoSeriesList} />
      <RouteWithLayout path="/videos/:videoId" component={VideoContent} />
      <RouteWithLayout path="/videos" component={VideoList} />

      <RouteWithLayout path="/musics/playlist/:playlistId/edit" component={MusicplaylistEdit} />
      <RouteWithLayout path="/musics/playlist/:playlistId/musics" component={MusicplaylistMusics} />
      <RouteWithLayout path="/musics/playlist/:playlistId" component={MusicPlaylist} />
      <RouteWithLayout path="/musics/playlist" component={MusicPlaylist} />
      <RouteWithLayout path="/musics" component={MusicList} />

      <Route path="/comics/:comicId" component={ComicContent} />
      <RouteWithLayout path="/comics" component={ComicList} />

      <RouteWithLayout path="/user/videos" component={UserVideo} />
      <RouteWithLayout path="/user/password-change" component={PasswordChangePage} />

      <Route component={NotFound} />
    </Switch>
  );
};

const mapDispatchToProps = {
  musicTagList: musicTagListAsync.request,
  videoTagList: videoTagList.request,
};

export default connect(undefined, mapDispatchToProps)(MainPage);
