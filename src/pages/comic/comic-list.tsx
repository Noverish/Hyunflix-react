import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import { ComicList } from 'src/components';
import { Comic } from 'src/models';
import { listComic } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const link = (comic: Comic) => `/comics/${comic.id}`;
const headerExtra = (
  <Link to="/comics/series">
    <Button type="primary">시리즈 별로 보기</Button>
  </Link>
);

const ComicListPage: React.FC<RouteComponentProps> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(listComic, props.history, PAGE_SIZE);

  return (
    <ComicList
      items={items}
      total={total}
      loading={loading}

      query={query}
      onQueryChange={setQuery}

      page={page}
      onPageChange={setPage}
      pageSize={PAGE_SIZE}

      title="만화"
      link={link}
      headerExtra={headerExtra}
      onBack={props.history.goBack}
    />
  );
};

export default ComicListPage;
