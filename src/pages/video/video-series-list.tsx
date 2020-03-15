import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { VideoSeries } from 'src/models';
import { VideoSeriesList } from 'src/components';
import { videoSeriesList } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const link = (item: VideoSeries) => `/videos/series/${item.id}`;

const VideoSeriesListPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(videoSeriesList, props.history, PAGE_SIZE);

  return (
    <VideoSeriesList
      items={items}
      total={total}
      loading={loading}

      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}

      query={query}
      onQueryChange={setQuery}

      title="시리즈 별로 보기"
      link={link}
      onBack={props.history.goBack}
    />
  );
};

export default VideoSeriesListPage;
