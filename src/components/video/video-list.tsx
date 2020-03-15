import React from 'react';
import { Checkbox, Tag } from 'antd';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import withList, { InjectedProps, Options } from 'components/hoc/list';
import { Video } from 'models';
import { resolution2Color } from 'utils';
import { RootState } from 'reducers';

interface ReduxProps {
  tags: Map<string, string>;
  isMobile: boolean;
}

interface OriginalProps {

}

type Props = OriginalProps & InjectedProps<Video> & ReduxProps;

const renderTags = (props: Props) => {
  const { item, tags } = props;

  return item.tags.map(t => (
    <Tag color={tags.get(t)} key={t}>{t}</Tag>
  ));
};

const VideoItem: React.FC<Props> = (props) => {
  const { item, checked, isMobile } = props;
  const color = resolution2Color(item.resolution);

  if (isMobile) {
    return (
      <div className={classnames('item mobile', { selected: checked })}>
        <div className="first-row">
          {checked !== undefined && <Checkbox checked={checked} />}
          <span className="title">{item.title}</span>
        </div>
        <div className="last-row">
          {renderTags(props)}
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
      {renderTags(props)}
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

const options: Options<Video> = {
  compare: (t1, t2) => t1.id === t2.id,
};

const connected = connect(mapStateToProps)(VideoItem);
export default withList<Video>(options)<OriginalProps>(connected);
