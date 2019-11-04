import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { VideoSeriesList } from 'components';
import { VideoSeries } from 'models';
import { videoSeriesList } from 'api';

const VideoSeriesListPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [serieses, setSerieses] = useState([] as VideoSeries[]);

  const category: string = props.match.params['category'];

  useEffect(() => {
    videoSeriesList()
      .then(serieses => setSerieses(serieses))
      .catch();
  },        [category]);

  return (
    <VideoSeriesList
      serieses={serieses}
      onBack={() => props.history.goBack()}
      title={category}
    />
  );
};

export default VideoSeriesListPage;
