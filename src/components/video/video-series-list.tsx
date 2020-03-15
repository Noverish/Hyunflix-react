import React from 'react';
import { Tag } from 'antd';
import { connect } from 'react-redux';

import withList, { InjectedProps, Options } from 'src/components/hoc/list';
import { VideoSeries } from 'src/models';
import { RootState } from 'src/reducers';

interface ReduxProps {
  tags: Map<string, string>;
}

interface OriginalProps {

}

type Props = OriginalProps & InjectedProps<VideoSeries> & ReduxProps;

const renderTags = (props: Props) => {
  const { item, tags } = props;
  const t = item.category;

  return <Tag color={tags.get(t)} key={t}>{t}</Tag>;
};

const VideoSeriesItem: React.FC<Props> = (props) => {
  const { item } = props;

  return (
    <div className="item desktop">
      <span className="id">{item.id}</span>
      {renderTags(props)}
      <span className="title">{item.title}</span>
      <span className="gray float-right">{`총 ${item.videos.length}편`}</span>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  tags: state.video.tags,
});

const options: Options<VideoSeries> = {
  compare: (t1, t2) => t1.id === t2.id,
};

const connected = connect(mapStateToProps)(VideoSeriesItem);
export default withList<VideoSeries>(options)<OriginalProps>(connected);
