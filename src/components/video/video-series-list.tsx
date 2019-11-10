import React from 'react';
import { Tag } from 'antd';
import { connect } from 'react-redux';

import withList, { InjectedProps, Options } from 'components/hoc/list';
import { VideoSeries } from 'models';

interface ReduxProps {
  isMobile: boolean;
}

interface OriginalProps {

}

type Props = OriginalProps & InjectedProps<VideoSeries> & ReduxProps;

const VideoSeriesItem: React.FC<Props> = (props) => {
  const { item } = props;

  return (
    <div className="item desktop">
      <span className="id">{item.id}</span>
      <Tag color="magenta">{item.category}</Tag>
      <span className="title">{item.title}</span>
      <span className="gray float-right">{`총 ${item.videos.length}편`}</span>
    </div>
  );
};

// TODO state to type
const mapStateToProps = state => ({
  isMobile: state.etc.isMobile,
});

const options: Options<VideoSeries> = {
  compare: (t1, t2) => t1.id === t2.id,
};

const connected = connect(mapStateToProps)(VideoSeriesItem);
export default withList<VideoSeries>(options)<OriginalProps>(connected);
