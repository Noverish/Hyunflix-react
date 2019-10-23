import React from 'react';
import { PageHeader, List, Spin } from 'antd';

import UserVideoItem from './user-video-item';
import { UserVideo } from 'models';

interface Props {
  userVideos: UserVideo[];
  loading: boolean;
}

const VideoHistoryList: React.FunctionComponent<Props> = (props) => {
  const { userVideos, loading } = props;

  const renderItem = userVideo => (
    <UserVideoItem userVideo={userVideo} />
  );

  return (
    <div className="article-list-page">
      <div className="page-header">
        <PageHeader title="시청기록" />
      </div>
      <div className="page-content">
        <Spin spinning={loading} tip="Loading...">
          <List
            dataSource={userVideos}
            renderItem={renderItem}
          />
        </Spin>
      </div>
    </div>
  );
};

export default VideoHistoryList;
