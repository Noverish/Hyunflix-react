import React from 'react';
import { Tag } from 'antd';
import { connect } from 'react-redux';

import { VideoSeries } from 'src/models';
import { RootState } from 'src/reducers';
import withLink from '../hoc/with-link';

interface Props {
  item: VideoSeries;
}

interface ReduxProps {
  tags: Map<string, string>;
}

const renderTags = (item: VideoSeries, tags: Map<string, string>) => {
  const t = item.category;
  return <Tag color={tags.get(t)} key={t}>{t}</Tag>;
};

const VideoSeriesItem = ({ item, tags }: Props & ReduxProps) => (
  <div className="item desktop">
    <span className="id">{item.id}</span>
    {renderTags(item, tags)}
    <span className="title">{item.title}</span>
    <span className="gray float-right">{`총 ${item.videos.length}편`}</span>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  tags: state.video.tags,
});

const connected = connect(mapStateToProps)(VideoSeriesItem);
export default withLink<VideoSeries, Props>(connected);
