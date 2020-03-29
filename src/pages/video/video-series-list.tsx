import React from 'react';
import { List, Pagination } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import { VideoSeries } from 'src/models';
import { PageHeader, VideoSeriesItem } from 'src/components';
import { videoSeriesList } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const renderItem = (item: VideoSeries) => (
  <VideoSeriesItem item={item} link={`/videos/series/${item.id}`} />
);

const VideoSeriesListPage = (props: RouteComponentProps) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(videoSeriesList, props.history, PAGE_SIZE);

  return (
    <div className="list">
      <PageHeader
        title="시리즈 별로 보기"
        onBack={props.history.goBack}
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

export default VideoSeriesListPage;
