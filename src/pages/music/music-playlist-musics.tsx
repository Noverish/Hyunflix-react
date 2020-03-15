import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';
import find from 'lodash/find';

import { musicList, getMusicPlaylist, updateMusicPlaylist } from 'api';
import { Music, MusicPlaylist } from 'models';
import { MusicList } from 'components';
import { PAGE_SIZE } from 'config';
import { useSearch } from 'hooks';

const MusicPlaylistMuiscsPage = (props: RouteComponentProps) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(musicList, props.history, PAGE_SIZE);
  const [playlist, setPlaylist] = useState(undefined as MusicPlaylist | undefined);
  const [loading2, setLoading2] = useState(false);
  const playlistId: number = parseInt(props.match.params['playlistId']);
  const musics = playlist ? playlist.musics : [];

  useEffect(() => {
    getMusicPlaylist(playlistId)
      .then(setPlaylist)
      .catch(props.history.goBack);
  }, [playlistId, props.history.goBack]);

  // functions
  const onItemClick = useCallback((music: Music) => {
    setPlaylist((playlist: MusicPlaylist | undefined) => {
      if (!playlist) {
        return playlist;
      }

      const { musics } = playlist;
      const newMusics = find(musics, music)
        ? musics.filter(v => v.id !== music.id)
        : [...musics, music];

      return {
        ...playlist,
        musics: newMusics,
      };
    });
  }, []);

  const onComplete = useCallback(() => {
    const musicIds = playlist!.musics.map(v => v.id);
    setLoading2(true);
    updateMusicPlaylist(playlistId, undefined, musicIds)
      .then(props.history.goBack);
  }, [playlist, playlistId, props.history.goBack]);

  // components
  const headerExtra = useMemo(() => (
    <Button onClick={onComplete} type="primary">완료</Button>
  ), [onComplete]);

  return (
    <MusicList
      items={items}
      total={total}
      loading={loading || loading2}

      query={query}
      onQueryChange={setQuery}

      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}

      title={playlist ? playlist.title : ''}
      headerExtra={headerExtra}
      onBack={props.history.goBack}

      checklist={musics}
      onItemClick={onItemClick}
    />
  );
};

export default MusicPlaylistMuiscsPage;
