import React from 'react';
import { Tag } from 'antd';
import { useSelector } from 'react-redux';

import { VideoSeries } from 'src/models';
import { RootState } from 'src/features';
import withLink from '../hoc/with-link';

interface Props {
  item: VideoSeries;
}

const renderTags = (item: VideoSeries, tags: Map<string, string>) => {
  const t = item.category;
  return <Tag color={tags.get(t)} key={t}>{t}</Tag>;
};

const VideoSeriesItem = ({ item }: Props) => {
  const tags = useSelector((state: RootState) => state.video.tags);

  return (
    <div className="item desktop">
      <span className="id">{item.id}</span>
      {renderTags(item, tags)}
      <span className="title">{item.title}</span>
      <span className="gray float-right">{`총 ${item.videos.length}편`}</span>
    </div>
  )
};

export default withLink<VideoSeries, Props>(VideoSeriesItem);
