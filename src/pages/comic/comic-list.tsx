import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, List, Pagination } from 'antd';

import { PageHeader, ComicItem } from 'src/components';
import { Comic } from 'src/models';
import { listComic } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const headerExtra = (
  <Link to="/comics/series">
    <Button type="primary">시리즈 별로 보기</Button>
  </Link>
);

const renderItem = (item: Comic) => (
  <ComicItem item={item} link={`/comics/${item.id}`} />
);

const ComicListPage: React.FC<RouteComponentProps> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(listComic, props.history, PAGE_SIZE);

  return (
    <div className="list">
      <PageHeader
        title="만화"
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

export default ComicListPage;
