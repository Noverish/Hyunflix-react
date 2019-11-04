import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { VideoList } from 'components';
import { VideoSeries, Video } from 'models';
import { videoSeries } from 'api';

const VideoSeriesContentPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [series, setSeries] = useState(null as VideoSeries | null);

  const category: string = props.match.params['category'];
  const seriesId: number = parseInt(props.match.params['seriesId'], 10);

  useEffect(() => {
    videoSeries(seriesId)
      .then(series => setSeries(series))
      .catch();
  },        [category, seriesId]);

  if (series) {
    return (
      <VideoList
        videos={series.videos}
        onItemClick={(video: Video) => props.history.push(`/videos/${video.id}`)}
        onBack={() => props.history.goBack()}
        title={series.title}
        subTitle={`총 ${series.videos.length}편`}
      />
    );
  }

  return <div />;
};

export default VideoSeriesContentPage;
