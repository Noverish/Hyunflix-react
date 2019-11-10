import React from 'react';

import withContainer from 'components/hoc/container';
import { VideoList } from 'components';
import { Video } from 'models';
import { videoList } from 'api';

const VideoListContainer = withContainer<Video>()(VideoList);
const link = (video: Video) => `/videos/${video.id}`;

const VideoListPage: React.FunctionComponent = () => {
  return (
    <VideoListContainer
      title="Video"
      subTitle="영화, 드라마, 예능"
      search={videoList}
      link={link}
    />
  );
};

export default VideoListPage;
