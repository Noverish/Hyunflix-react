import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button } from 'antd';

import { musicList } from 'api';
import { MusicList } from 'components';
import { PAGE_SIZE } from 'config';
import { useSearch } from 'hooks';

const MusicListPage = (props: RouteComponentProps) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(musicList, props.history, PAGE_SIZE);

  const onItemClick = useCallback(() => {}, []);

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

export default MusicListPage;
