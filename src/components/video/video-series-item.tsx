import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { connect } from 'react-redux';

import { VideoSeries } from 'models';

interface Props {
  series: VideoSeries;
  link: string;
}

class VideoSeriesItem extends React.Component<Props> {
  render() {
    const { series, link } = this.props;

    return (
      <Link to={link} className="article-item">
        <div className="first section">
          <span className="article-id">{series.id}</span>
          <Tag color="magenta">{series.category}</Tag>
          <span className="article-title">{series.title}</span>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispathToProps = {

};

export default connect(mapStateToProps, mapDispathToProps)(VideoSeriesItem);
