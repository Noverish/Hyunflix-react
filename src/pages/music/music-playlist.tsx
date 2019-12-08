import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import find from 'lodash/find';

import { MusicPlaylistTabs } from 'components';
import { MusicPlaylist } from 'models';
import { listMusicPlaylist, createMusicPlaylist, deleteMusicplaylist } from 'api';

const MusicPlaylistPage = (props: RouteComponentProps) => {
  const [playlists, setPlaylists] = useState([] as MusicPlaylist[]);
  const [current, setCurrent] = useState(undefined as MusicPlaylist | undefined);

  if (current === undefined || !find(playlists, current)) {
    if (playlists.length > 0) {
      setCurrent(playlists[0]);
    }
  }

  useEffect(() => {
    listMusicPlaylist().then(setPlaylists);
  }, []);

  // functions
  const onChange = useCallback((playlist: MusicPlaylist) => {
    setCurrent(playlist);
  }, []);

  const onAdd = useCallback(() => {
    createMusicPlaylist('Playlist ' + (playlists.length + 1))
      .then(listMusicPlaylist)
      .then(setPlaylists);
  }, [playlists.length]);

  const onDelete = useCallback((playlist: MusicPlaylist) => {
    deleteMusicplaylist(playlist.id)
      .then(listMusicPlaylist)
      .then(setPlaylists);
  }, []);

  return (
    <div>
      <MusicPlaylistTabs
        playlists={playlists}
        current={current}
        onAdd={onAdd}
        onChange={onChange}
        onDelete={onDelete}
      />
      {current ? current.title : 'undefined'}
    </div>
  );
};

export default MusicPlaylistPage;
