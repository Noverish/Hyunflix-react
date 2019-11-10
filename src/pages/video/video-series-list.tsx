import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import withContainer from 'components/hoc/container';
import { VideoSeries } from 'models';
import { VideoSeriesList } from 'components';
import { videoSeriesList } from 'api';

class VideoSeriesListContainer extends withContainer<VideoSeries>()(VideoSeriesList) {}
const link = (item: VideoSeries) => `/videos/series/${item.id}`;

const VideoSeriesListPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  return (
    <VideoSeriesListContainer
      title="시리즈 별로 보기"
      onBack={() => props.history.goBack()}
      search={videoSeriesList}
      link={link}
      history={props.history}
    />
  );
};

export default VideoSeriesListPage;
