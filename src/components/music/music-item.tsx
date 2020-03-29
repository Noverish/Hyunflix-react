import React from 'react';
import { Checkbox, Tag } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { Music } from 'src/models';
import { second2String } from 'src/utils';
import { RootState } from 'src/reducers';
import withLink from '../hoc/with-link';

interface Props {
  item: Music;
  checked?: boolean;
}

interface ReduxProps {
  tags: Map<string, string>;
  isMobile: boolean;
}

const renderTags = (item: Music, tags: Map<string, string>) => (
  item.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ))
);

const MusicItem = ({ item, checked, tags, isMobile }: Props & ReduxProps) => {
  const time = second2String(item.duration);

  if (isMobile) {
    return (
      <div className={classnames('item mobile', { selected: checked })}>
        <div className="first-row">
          {checked !== undefined && <Checkbox checked={checked} />}
          <span className="title">{item.title}</span>
          {item.youtube && <YoutubeOutlined style={{ color: '#f5222d' }} />}
        </div>
        <div className="last-row">
          {renderTags(item, tags)}
          <span className="gray float-right">{time}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="item desktop">
      {checked !== undefined && <Checkbox checked={checked} />}
      <span className="id">{item.id}</span>
      {renderTags(item, tags)}
      <span className="title">{item.title}</span>
      {item.youtube && <YoutubeOutlined style={{ color: '#f5222d' }} />}
      <span className="gray float-right">{time}</span>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  tags: state.music.tags,
  isMobile: state.etc.isMobile,
});

const connected = connect(mapStateToProps)(MusicItem);
export default withLink<Music, Props>(connected);
