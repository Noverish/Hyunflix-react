import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import withContainer from 'components/hoc/container';
import { VideoList } from 'components';
import { Video } from 'models';
import { videoList } from 'api';

const VideoListContainer = withContainer<Video>()(VideoList);
const link = (video: Video) => `/videos/${video.id}`;

const VideoListPage: React.FunctionComponent = () => {
  const headerExtra = (
    <Link to="/videos/series">
      <Button type="primary">시리즈 별로 보기</Button>
    </Link>
  );

  return (
    <VideoListContainer
      title="Video"
      subTitle="영화, 드라마, 예능"
      search={videoList}
      link={link}
      headerExtra={headerExtra}
    />
  );
};

export default VideoListPage;
