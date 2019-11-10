import React from 'react';
import { Checkbox, Tag } from 'antd';
import { connect } from 'react-redux';

import withList, { InjectedProps, Options } from 'components/hoc/list';
import { UserVideo } from 'models';

interface ReduxProps {
  tags: Map<string, string>;
  isMobile: boolean;
}

interface OriginalProps {

}

type Props = OriginalProps & InjectedProps<UserVideo> & ReduxProps;

const renderTags = (props: Props) => {
  const { item, tags } = props;

  return item.video.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ));
};

const UserVideoItem: React.FC<Props> = (props) => {
  const { item, checked } = props;
  const video = item.video;
  const percent = Math.floor(item.time / video.duration * 100);

  // TODO make mobile
  return (
    <div className="item desktop">
      {checked !== undefined && <Checkbox checked={checked} />}
      {renderTags(props)}
      <span className="title">{video.title}</span>
      <span className="gray">{percent}% 시청,</span>
      <span className="gray">총 시간: {video.durationString},</span>
      <span className="gray">{item.date} 시청</span>
    </div>
  );
};

// TODO state to type
const mapStateToProps = state => ({
  tags: state.video.tags,
  isMobile: state.etc.isMobile,
});

const options: Options<UserVideo> = {
  compare: (t1, t2) => t1.video.id === t2.video.id,
};

const connected = connect(mapStateToProps)(UserVideoItem);
export default withList<UserVideo>(options)<OriginalProps>(connected);
