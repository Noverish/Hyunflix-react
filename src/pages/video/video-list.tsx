import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Video } from 'models';
import { VideoListWrapper } from 'containers';

const VideoListPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const onItemClick = (video: Video) => {
    props.history.push(`/videos/${video.id}`);
  };

  return (
    <div className="video-article-list-page">
      <VideoListWrapper onItemClick={onItemClick} subTitle="영화, 드라마, 예능" />
    </div>
  );
};

export default VideoListPage;
