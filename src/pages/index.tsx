import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { RouteWithLayout } from 'src/components';
import { RootActions } from 'src/features';

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

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RootActions.music.tags.request());
    dispatch(RootActions.video.tags.request());
  }, [dispatch]);

  return (
    <Switch>
      <RouteWithLayout exact path="/" component={Home} />
      <RouteWithLayout exact path="/login" render={_ => <Redirect to="/" />} />
      <RouteWithLayout exact path="/register" render={_ => <Redirect to="/" />} />

      <RouteWithLayout path="/videos/series/:seriesId" component={VideoSeriesContent} />
      <RouteWithLayout path="/videos/series" component={VideoSeriesList} />
      <RouteWithLayout path="/videos/:videoId" component={VideoContent} />
      <RouteWithLayout path="/videos" component={VideoList} />

      <RouteWithLayout path="/musics/playlist/:playlistId/edit" component={MusicplaylistEdit} />
      <RouteWithLayout path="/musics/playlist/:playlistId/items" component={MusicplaylistMusics} />
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

export default MainPage;
