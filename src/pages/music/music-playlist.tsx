import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createMusicPlaylist, deleteMusicPlaylist, getMusicPlaylist, listMusicPlaylist } from 'src/api';
import { MusicPlayer, MusicPlaylistHeader, MusicPlaylistTabs } from 'src/components';
import { MusicPlaylist } from 'src/models';

const MusicPlaylistPage = (props: RouteComponentProps) => {
  const { history, match } = props;
  const [playlists, setPlaylists] = useState([] as MusicPlaylist[]);
  const [current, setCurrent] = useState(undefined as MusicPlaylist | undefined);
  const playlistId: number = parseInt(match.params['playlistId']);

  if (playlists.length) {
    if (!playlists.find(v => v.id === playlistId)) {
      history.replace(`/musics/playlist/${playlists[0].id}`); // TODO
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
    history.replace(`/musics/playlist/${playlist.id}`); // TODO
  }, [history]);

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
