import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { VideoList } from 'components';
import withContainer from 'components/hoc/container';
import { VideoSeries, Video } from 'models';
import { videoSeries } from 'api';

class VideoSeriesContentContainer extends withContainer<Video>()(VideoList) {}
const link = (video: Video) => `/videos/${video.id}`;

const search = async (series: VideoSeries | null, query: string, page: number, pageSize: number) => {
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
};

const VideoSeriesContentPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const videoSeriesContentList = useRef<VideoSeriesContentContainer | null>(null);
  const [series, setSeries] = useState(null as VideoSeries | null);

  const seriesId: number = parseInt(props.match.params['seriesId'], 10);

  useEffect(() => {
    videoSeries(seriesId)
      .then((series) => {
        setSeries(series);
        videoSeriesContentList.current!.refresh();
      })
      .catch();
  },        [seriesId]);

  return (
    <VideoSeriesContentContainer
      ref={videoSeriesContentList}
      title={series ? series.title : ''}
      subTitle={`총 ${series ? series.videos.length : 0}편`}
      link={link}

      onBack={() => props.history.goBack()}
      search={search.bind(null, series)}
    />
  );
};

export default VideoSeriesContentPage;
