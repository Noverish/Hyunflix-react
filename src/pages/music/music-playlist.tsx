import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MusicPlaylistTabs, MusicPlayer, MusicPlaylistHeader } from 'components';
import { MusicPlaylist } from 'models';
import { listMusicPlaylist, createMusicPlaylist, deleteMusicPlaylist, getMusicPlaylist } from 'api';

const MusicPlaylistPage = (props: RouteComponentProps) => {
  const [playlists, setPlaylists] = useState([] as MusicPlaylist[]);
  const [current, setCurrent] = useState(undefined as MusicPlaylist | undefined);
  const playlistId: number = parseInt(props.match.params['playlistId']);

  if (playlists.length) {
    if (!playlists.find(v => v.id === playlistId)) {
      props.history.replace(`/musics/playlist/${playlists[0].id}`); // TODO
    }
  }

  useEffect(() => {
    if (playlistId) {
      getMusicPlaylist(playlistId).then(setCurrent);
    }
  }, [playlistId]);

  useEffect(() => {
    listMusicPlaylist()
      .then(setPlaylists);
  }, []);

  // functions
  const onChange = useCallback((playlist: MusicPlaylist) => {
    props.history.replace(`/musics/playlist/${playlist.id}`); // TODO
  }, [props.history]);

  const onAdd = useCallback(() => {
    createMusicPlaylist(`Playlist ${playlists.length + 1}`)
      .then(listMusicPlaylist)
      .then(setPlaylists);
  }, [playlists.length]);

  const onDelete = useCallback((playlist: MusicPlaylist) => {
    deleteMusicPlaylist(playlist.id)
      .then(listMusicPlaylist)
      .then(setPlaylists);
  }, []);

  const musics = current ? current.musics : [];

  return (
    <div>
      <MusicPlaylistHeader
        current={current}
        onAdd={onAdd}
        onDelete={onDelete}
      />
      <MusicPlaylistTabs
        current={current}
        playlists={playlists}
        onChange={onChange}
      />
      <MusicPlayer playlist={musics} />
    </div>
  );
};

export default MusicPlaylistPage;
