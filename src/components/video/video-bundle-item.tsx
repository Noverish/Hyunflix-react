import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { connect } from 'react-redux';

import { VideoBundle } from 'models';

interface Props {
  bundle: VideoBundle;
  link: string;
}

class VideoBundleItem extends React.Component<Props> {
  render() {
    const { bundle, link } = this.props;
    
    return (
      <Link to={link} className="article-item">
        <div className="first section">
          <span className="article-id">{bundle.id}</span>
          <Tag color='magenta'>{bundle.category}</Tag>
          <span className="article-title">{bundle.title}</span>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispathToProps = {
  
}

export default connect(mapStateToProps, mapDispathToProps)(VideoBundleItem);
