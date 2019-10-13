import React from 'react';
import { PageHeader, List } from 'antd';

import UserVideoItem from './user-video-item';
import { UserVideo } from 'models';

interface Props {
  userVideos: UserVideo[];
}

const VideoHistoryList: React.FunctionComponent<Props> = (props) => {
  const { userVideos } = props;

  const renderItem = userVideo => (
    <UserVideoItem userVideo={userVideo} />
  );

  return (
    <div className="article-list-page">
      <div className="page-header">
        <PageHeader title="시청기록" />
      </div>
      <div className="page-content">
        <List
          dataSource={userVideos}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
};

export default VideoHistoryList;
