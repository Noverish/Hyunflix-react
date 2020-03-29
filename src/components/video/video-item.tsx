import React from 'react';
import { Checkbox, Tag } from 'antd';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { Video } from 'src/models';
import { resolution2Color } from 'src/utils';
import { RootState } from 'src/reducers';
import withLink from '../hoc/with-link';

interface Props {
  item: Video;
  checked?: boolean;
}

interface ReduxProps {
  tags: Map<string, string>;
  isMobile: boolean;
}

const renderTags = (item: Video, tags: Map<string, string>) => (
  item.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ))
);

const VideoItem = ({ item, checked, isMobile, tags }: Props & ReduxProps) => {
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

const mapStateToProps = (state: RootState) => ({
  tags: state.video.tags,
  isMobile: state.etc.isMobile,
});

const connected = connect(mapStateToProps)(VideoItem);
export default withLink<Video, Props>(connected);
