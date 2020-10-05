import { Checkbox, Progress, Tag } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/features';
import { UserVideo } from 'src/models';
import withLink from '../hoc/with-link';


interface Props {
  item: UserVideo;
  checked?: boolean;
}

const renderTags = (item: UserVideo, tags: {[tag: string]: string}) => (
  item.video.tags.map(t => (
    <Tag color={tags[t]} key={t}>{t}</Tag>
  ))
);

const UserVideoItem = ({ item, checked }: Props) => {
  const tags = useSelector((state: RootState) => state.video.tags);
  const isMobile = useSelector((state: RootState) => state.screen.isMobile);
  const { video } = item;
  const percent = Math.floor((item.time / video.duration) * 100);

  if (isMobile) {
    return (
      <div className={classnames('item mobile', { selected: checked })}>
        <div className="first-row" style={{ display: 'flex' }}>
          {checked !== undefined && <Checkbox checked={checked} />}
          <span className="title">{video.title}</span>
          <Progress className="float-right" percent={percent} size="small" status="active" style={{ width: '100px', flex: '0 0 auto' }} />
        </div>
        <div className="last-row">
          {renderTags(item, tags)}
          <span className="gray float-right">
            {item.date}
            {' '}
            시청
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="item desktop">
      {checked !== undefined && <Checkbox checked={checked} />}
      {renderTags(item, tags)}
      <span className="title">{video.title}</span>
      <Progress className="float-right" percent={percent} size="small" status="active" style={{ width: '100px' }} />
      <span className="gray">
        {item.date}
        {' '}
        시청
      </span>
    </div>
  );
};

export default withLink<UserVideo, Props>(UserVideoItem);
