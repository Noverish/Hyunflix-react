import { Checkbox, Tag } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/features';
import { Video } from 'src/models';
import { resolution2Color } from 'src/utils';
import withLink from '../hoc/with-link';

interface Props {
  item: Video;
  checked?: boolean;
}

const renderTags = (item: Video, tags: {[tag: string]: string}) => (
  item.tags.map(t => (
    <Tag color={tags[t]} key={t}>{t}</Tag>
  ))
);

const VideoItem = ({ item, checked }: Props) => {
  const tags = useSelector((state: RootState) => state.video.tags);
  const isMobile = useSelector((state: RootState) => state.screen.isMobile);
  const color = resolution2Color(item.resolution);

  const tag = renderTags(item, tags);

  if (isMobile) {
    return (
      <div className={classnames('item mobile', { selected: checked })}>
        <div className="first-row">
          {checked !== undefined && <Checkbox checked={checked} />}
          <span className="title">{item.title}</span>
        </div>
        <div className="last-row">
          {tag}
          <span className="gray">{item.durationString}</span>
          <span className="gray float-right">{item.date}</span>
          <Tag color={color}>{item.resolution}</Tag>
        </div>
      </div>
    );
  }
  return (
    <div className="item desktop">
      {checked !== undefined && <Checkbox checked={checked} />}
      <span className="id">{item.id}</span>
      {tag}
      <span className="title">{item.title}</span>
      <span className="gray float-right">{item.durationString}</span>
      <Tag color={color}>{item.resolution}</Tag>
      <span className="gray">{item.date}</span>
    </div>
  );
};

export default withLink<Video, Props>(VideoItem);
