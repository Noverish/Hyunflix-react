import React, { useCallback, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button, List, Pagination } from 'antd';
import { connect } from 'react-redux';

import { musicList } from 'src/api';
import { PageHeader, MusicItem } from 'src/components';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';
import { Music } from 'src/models';
import { RootState } from 'src/reducers';

const headerExtra = (
  <Link to="/musics/playlist">
    <Button type="primary">Go to playlist</Button>
  </Link>
);

const MusicListPage = (props: RouteComponentProps & { accessToken: string }) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(musicList, props.history, PAGE_SIZE);
  const [nowPlaying, setNowPlaying] = useState(null as HTMLAudioElement | null);

  useEffect(() => nowPlaying?.pause(), [nowPlaying]);

  const onItemClick = useCallback((item: Music) => {
    const newSrc = `${item.url}?token=${props.accessToken}`;

    if (nowPlaying && newSrc === decodeURI(nowPlaying.src)) {
      setNowPlaying(null);
    } else {
      const newPlaying = new Audio(newSrc);
      newPlaying.play();
      // newPlaying.addEventListener('timeupdate', (event: any) => {
      //   const currentTime: number = event.path[0].currentTime;
      // });
      setNowPlaying(newPlaying);
    }
  }, [nowPlaying, props.accessToken]);

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
      <List
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

const mapStateToProps = (state: RootState) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps)(MusicListPage);
