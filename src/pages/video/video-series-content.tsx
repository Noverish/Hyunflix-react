import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { VideoList } from 'components';
import { VideoSeries, Video } from 'models';
import { videoSeries, SearchResult } from 'api';
import { useSearch } from 'hooks';
import { PAGE_SIZE } from 'config';

const link = (video: Video) => `/videos/${video.id}`;

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
    <VideoList
      items={items}
      total={total}
      loading={loading || loading2}

      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}

      query={query}
      onQueryChange={setQuery}

      title={series ? series.title : ''}
      subTitle={`총 ${series ? series.videos.length : 0}편`}
      link={link}
      onBack={() => props.history.goBack()}
    />
  );
};

export default VideoSeriesContentPage;
