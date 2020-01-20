import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';

import { musicList } from 'api';
import { MusicList } from 'components';
import { PAGE_SIZE } from 'config';
import { useSearch } from 'hooks';
import { Music } from 'models';
import { RootState } from 'reducers';

const MusicListPage = (props: RouteComponentProps & { sessionId: string }) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(musicList, props.history, PAGE_SIZE);
  const [nowPlaying, setNowPlaying] = useState(null as HTMLAudioElement | null);

  const onItemClick = useCallback((item: Music) => {
    const newSrc = `${item.url}?sessionId=${props.sessionId}`;

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
  }, [nowPlaying, props.sessionId]);

  useEffect(() => {
    return () => {
      nowPlaying?.pause();
    };
  }, [nowPlaying]);

  // components
  const headerExtra = useMemo(() => (
    <Link to="/musics/playlist">
      <Button type="primary">Go to playlist</Button>
    </Link>
  ), []);

  return (
    <MusicList
      items={items}
      total={total}
      loading={loading}

      query={query}
      onQueryChange={setQuery}

      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}

      title="음악"
      headerExtra={headerExtra}
      onItemClick={onItemClick}
      onBack={props.history.goBack}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  sessionId: state.auth.sessionId,
});

export default connect(mapStateToProps)(MusicListPage);
