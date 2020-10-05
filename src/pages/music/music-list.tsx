import { Button, List, Pagination } from 'antd';
import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { musicList } from 'src/api';
import { MusicItem, PageHeader } from 'src/components';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';
import { Music } from 'src/models';
import { RootState } from 'src/features';

const headerExtra = (
  <Link to="/musics/playlist">
    <Button type="primary">Go to playlist</Button>
  </Link>
);

const MusicListPage = (props: RouteComponentProps) => {
  const { history } = props;
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(musicList, history, PAGE_SIZE);
  const nowPlayingRef = useRef<HTMLAudioElement>(null);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const onItemClick = useCallback((item: Music) => {
    const newSrc = `${item.url}?token=${accessToken}`;

    const nowPlaying = nowPlayingRef.current;
    if (nowPlaying) {
      nowPlaying.pause();
      nowPlaying.src = newSrc;
      nowPlaying.currentTime = 0;
      nowPlaying.play();
    }
  }, [accessToken]);

  const renderItem = useCallback((item: Music) => (
    <MusicItem
      item={item}
      link={`/musics/${item.id}`}
      onClick={onItemClick}
    />
  ), [onItemClick]);

  return (
    <div className="list">
      <PageHeader
        title="음악"
        backIcon={false}
        extra={headerExtra}
        query={query}
        onQueryChange={setQuery}
      />
      <audio
        ref={nowPlayingRef}
        style={{ width: '100%', margin: '8px 0' }}
        controls
        loop
        src="/media/cc0-audio/t-rex-roar.mp3"
      />
      <List
        className="border-top"
        dataSource={items}
        renderItem={renderItem}
        loading={loading}
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

export default MusicListPage;
