import React from 'react';
import { PageHeader, List, Spin } from 'antd';

import UserVideoItem from './user-video-item';
import { UserVideo } from 'models';

interface Props {
  userVideos: UserVideo[];
  loading: boolean;
  onItemCheck?(userVideo: UserVideo, checked: boolean): void;
  checklist?: UserVideo[];
  headerExtra?: React.ReactNode;
}

const VideoHistoryList: React.FunctionComponent<Props> = (props) => {
  const { userVideos, loading, headerExtra, checklist, onItemCheck } = props;

  const renderItem = userVideo => (
    <UserVideoItem
      userVideo={userVideo}
      onCheck={onItemCheck}
      checked={checklist !== undefined ? checklist.includes(userVideo) : undefined}
    />
  );

  return (
    <div className="article-list-page">
      <div className="page-header">
        <PageHeader title="시청기록" extra={headerExtra} />
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
