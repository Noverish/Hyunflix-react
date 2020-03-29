import React from 'react';
import { Checkbox, Tag, Progress } from 'antd';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { RootState } from 'src/reducers';
import { UserVideo } from 'src/models';
import withLink from '../hoc/with-link';

interface Props {
  item: UserVideo;
  checked?: boolean;
}

interface ReduxProps {
  tags: Map<string, string>;
  isMobile: boolean;
}

const renderTags = (item: UserVideo, tags: Map<string, string>) => (
  item.video.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ))
);

const UserVideoItem = ({ item, checked, tags, isMobile }: Props & ReduxProps) => {
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

const mapStateToProps = (state: RootState) => ({
  tags: state.video.tags,
  isMobile: state.etc.isMobile,
});

const connected = connect(mapStateToProps)(UserVideoItem);
export default withLink<UserVideo, Props>(connected);
