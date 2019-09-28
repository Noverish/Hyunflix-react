import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Tag, Tooltip, Checkbox } from 'antd';
import { connect } from 'react-redux';

import { VideoArticle } from 'models';
import { time } from 'utils';

interface Props extends RouteComponentProps {
  highlight: string;
  article: VideoArticle;
  
  // Redux Props
  tags: string;
  
  // TODO Default Props
  checkable?: boolean;
  checked?: boolean;
  onCheck?(article: VideoArticle, checked: boolean): void;
}

class VideoItem extends React.Component<Props> {
  public static defaultProps = {
    checkable: false,
    checked: false,
    onCheck: () => {},
  }
  
  renderTitle = (title: string) => {
    const { highlight } = this.props;
    
    // TODO const index = title.search(new RegExp(highlight, 'i'));
    const index = title.indexOf(highlight);
    const beforeStr = title.substr(0, index);
    const matchStr = title.substr(index, highlight.length);
    const afterStr = title.substr(index + highlight.length);
    return (index > -1)
      ? (
        <span className="title">
          {beforeStr}
          <span style={{ color: '#f50' }}>{matchStr}</span>
          {afterStr}
        </span>
      )
      : (
        <span className="title">{title}</span>
      );
  }
  
  renderTags = () => {
    const { article, tags } = this.props;
    // TODO 멋있게
    const colorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
    
    return article.tags.map(t => (
      <Tag color={colorList[tags.indexOf(t) % colorList.length]} key={t}>{t}</Tag>
    ))
  }
  
  render() {
    const { article, checked, checkable } = this.props;
    
    // TODO 여러 비디오 지원
    const video = article.videos[0];
    const link = `/articles/videos/${article.articleId}`;
    const { resolution, color } = widthToResolutionAndColor(video.width);
    
    return (
      <Link to={link} className="article-item" onClick={checkable ? this.onClick : undefined}>
        <div className="first-section">
          { checkable && <Checkbox className="check-box" checked={checked} /> }
          <span className="id">{article.articleId}</span>
          { this.renderTags() }
          { this.renderTitle(article.title) }
        </div>
        <div className="second-section">
          <span className="duration">{time.second2String(video.duration)}</span>
          <Tooltip placement="top" title={`${video.width}x${video.height}`}>
            <Tag className="resolution" color={color}>{resolution}</Tag>
          </Tooltip>
          <span className="date">{article.date}</span>
        </div>
      </Link>
    )
  }
  
  onClick = (e) => {
    e.preventDefault();
    const { article, checked } = this.props;
    this.props.onCheck!(article, !checked);
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.video.tags,
    checkedList: state.video.check,
  }
}

const mapDispathToProps = {
  
}

export default connect(mapStateToProps, mapDispathToProps)(withRouter(VideoItem));

function widthToResolutionAndColor(width: number) {
  const list = {
    1920: { resolution: '1080p', color: 'purple' },
    1280: { resolution: '720p', color: 'geekblue' },
    854: { resolution: '480p', color: 'green' },
    640: { resolution: '360p', color: 'red' },
  }
  
  let diff = 10000;
  let key = 0;
  Object.keys(list).forEach(n => {
    const d = Math.abs(parseInt(n) - width);
    if (d < diff) {
      diff = d;
      key = parseInt(n);
    }
  })
  
  return list[key];
}
