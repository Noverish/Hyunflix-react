import React from 'react';
import { Checkbox, Tag, Progress } from 'antd';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

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
  const { item, checked, isMobile } = props;
  const video = item.video;
  const percent = Math.floor(item.time / video.duration * 100);

  if (isMobile) {
    return (
      <div className={classnames('item mobile', { selected: checked })}>
        <div className="first-row" style={{ display: 'flex' }}>
          {checked !== undefined && <Checkbox checked={checked} />}
          <span className="title">{video.title}</span>
          <Progress className="float-right" percent={percent} size="small" status="active" style={{ width: '100px', flex: '0 0 auto' }}/>
        </div>
        <div className="last-row">
          {renderTags(props)}
          <span className="gray float-right">{item.date} 시청</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="item desktop">
        {checked !== undefined && <Checkbox checked={checked} />}
        {renderTags(props)}
        <span className="title">{video.title}</span>
        <Progress className="float-right" percent={percent} size="small" status="active" style={{ width: '100px' }}/>
        <span className="gray">{item.date} 시청</span>
      </div>
    );
  }
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
