import React from 'react';
import { Checkbox, Tag } from 'antd';
// import { YoutubeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { Music } from 'src/models';
import { second2String } from 'src/utils';
import { RootState } from 'src/features';
import withLink from '../hoc/with-link';

interface Props {
  item: Music;
  checked?: boolean;
}

const renderTags = (item: Music, tags: {[tag: string]: string}) => (
  item.tags.map(t => (
    <Tag color={tags[t]} key={t}>{t}</Tag>
  ))
);

const MusicItem = ({ item, checked }: Props) => {
  const tags = useSelector((state: RootState) =>  state.music.tags);
  const isMobile = useSelector((state: RootState) => state.screen.isMobile);
  const time = second2String(item.duration);

  if (isMobile) {
    return (
      <div className={classnames('item mobile', { selected: checked })}>
        <div className="first-row">
          {checked !== undefined && <Checkbox checked={checked} />}
          <span className="title">{item.title}</span>
          {/* {item.youtube && <YoutubeOutlined style={{ color: '#f5222d' }} />} */}
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
      {/* {item.youtube && <YoutubeOutlined style={{ color: '#f5222d' }} />} */}
      <span className="gray float-right">{time}</span>
    </div>
  );
};

export default withLink<Music, Props>(MusicItem);
