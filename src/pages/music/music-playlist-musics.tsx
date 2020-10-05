import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, List, Pagination } from 'antd';
import find from 'lodash/find';

import { musicList, getMusicPlaylist, updateMusicPlaylist } from 'src/api';
import { Music, MusicPlaylist } from 'src/models';
import { PageHeader, MusicItem } from 'src/components';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const MusicPlaylistMuiscsPage = (props: RouteComponentProps) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(musicList, props.history, PAGE_SIZE);
  const [playlist, setPlaylist] = useState(undefined as MusicPlaylist | undefined);
  const [loading2, setLoading2] = useState(false);
  const playlistId: number = parseInt(props.match.params['playlistId']);
  const musics = playlist ? playlist.musics : [];

  useEffect(() => {
    getMusicPlaylist(playlistId)
      .then(setPlaylist)
      .catch(props.history.back);
  }, [playlistId, props.history.back]);

  // functions
  const onComplete = useCallback(() => {
    const musicIds = playlist!.musics.map(v => v.id);
    setLoading2(true);
    updateMusicPlaylist(playlistId, undefined, musicIds)
      .then(props.history.back);
  }, [playlist, playlistId, props.history.back]);

  const onItemClick = useCallback((item: Music) => {
    setPlaylist((playlist: MusicPlaylist | undefined) => {
      if (!playlist) {
        return playlist;
      }

      const { musics } = playlist;
      const newMusics = find(musics, item)
        ? musics.filter(v => v.id !== item.id)
        : [...musics, item];

      return {
        ...playlist,
        musics: newMusics,
      };
    });
  }, []);

  const renderItem = useCallback((item: Music) => (
    <MusicItem
      item={item}
      link={`/musics/${item.id}`}
      onClick={onItemClick}
      checked={musics.some(v => v.id === item.id)}
    />
  ), [onItemClick, musics]);

  // components
  const headerExtra = useMemo(() => (
    <Button onClick={onComplete} type="primary">완료</Button>
  ), [onComplete]);

  return (
    <div className="list">
      <PageHeader
        title={playlist ? playlist.title : ''}
        onBack={props.history.back}
        extra={headerExtra}
        query={query}
        onQueryChange={setQuery}
      />
      <List
        dataSource={items}
        renderItem={renderItem}
        loading={loading || loading2}
      />
      <Pagination
        current={page}
        total={total}
        pageSize={PAGE_SIZE}
        onChange={setPage}
      />
    </div>
  );
};

export default MusicPlaylistMuiscsPage;
