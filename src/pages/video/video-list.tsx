import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, List, Pagination } from 'antd';

import { PageHeader, VideoItem } from 'src/components';
import { Video } from 'src/models';
import { videoList } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const headerExtra = (
  <Link to="/videos/series">
    <Button type="primary">시리즈 별로 보기</Button>
  </Link>
);

const renderItem = (item: Video) => (
  <VideoItem item={item} link={`/videos/${item.id}`} />
);

const VideoListPage: React.FC<RouteComponentProps> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(videoList, props.history, PAGE_SIZE);

  return (
    <div className="list">
      <PageHeader
        title="동영상"
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

export default VideoListPage;
