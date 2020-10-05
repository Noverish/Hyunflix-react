import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { List, Pagination } from 'antd';

import { PageHeader, VideoItem } from 'src/components';
import { VideoSeries, Video } from 'src/models';
import { videoSeries, SearchResult } from 'src/api';
import { useSearch } from 'src/hooks';
import { PAGE_SIZE } from 'src/config';

const renderItem = (item: Video) => (
  <VideoItem item={item} link={`/videos/${item.id}`} />
);

const VideoSeriesContentPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [series, setSeries] = useState(null as VideoSeries | null);
  const [loading2, setLoading] = useState(false);

  const search = useCallback(async (query: string, page: number, pageSize: number): Promise<SearchResult<Video>> => {
    if (!series) {
      return {
        total: 0,
        results: [],
      };
    }

    const searched = (series)
      ? series.videos.filter(v => v.title.includes(query))
      : [];

    const sliced = searched.slice((page - 1) * pageSize, (page) * pageSize);

    return {
      total: searched.length,
      results: sliced,
    };
  }, [series]);

  const { items, total, loading, query, page, setQuery, setPage } = useSearch<Video>(search, props.history, PAGE_SIZE);

  const seriesId: number = parseInt(props.match.params['seriesId'], 10);

  useEffect(() => {
    setLoading(true);

    videoSeries(seriesId)
      .then((series) => {
        setSeries(series);
        setLoading(false);
      })
      .catch();
  }, [seriesId]);

  return (
    <div className="list">
      <PageHeader
        title={series ? series.title : ''}
        subTitle={`총 ${series ? series.videos.length : 0}편`}
        onBack={props.history.back}
        query={query}
        onQueryChange={setQuery}
      />
      <List
        dataSource={items}
        renderItem={renderItem}
        loading={loading || loading2}
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

export default VideoSeriesContentPage;
