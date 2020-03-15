import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import { VideoList } from 'src/components';
import { Video } from 'src/models';
import { videoList } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const link = (video: Video) => `/videos/${video.id}`;
const headerExtra = (
  <Link to="/videos/series">
    <Button type="primary">시리즈 별로 보기</Button>
  </Link>
);

const VideoListPage: React.FC<RouteComponentProps> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(videoList, props.history, PAGE_SIZE);

  return (
    <VideoList
      items={items}
      total={total}
      loading={loading}

      query={query}
      onQueryChange={setQuery}

      page={page}
      onPageChange={setPage}
      pageSize={PAGE_SIZE}

      title="동영상"
      link={link}
      headerExtra={headerExtra}
      onBack={props.history.goBack}
    />
  );
};

export default VideoListPage;
