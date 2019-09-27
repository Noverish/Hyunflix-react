import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Tag, Tooltip } from 'antd';
import { connect } from 'react-redux';

import { VideoArticle } from 'models';
import { time } from 'utils';
import './article-item.css';

interface Props extends RouteComponentProps {
  tags: string;
  
  highlight: string;
  article: VideoArticle;
}

interface State {
  
}

class VideoItem extends React.Component<Props, State> {
  renderTitle = (title: string) => {
    const { highlight } = this.props;
    
    const index = title.search(new RegExp(highlight, 'i'));
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
    const { article } = this.props;
    const link = `/articles/videos/${article.articleId}`;
    
    const { resolution, color } = widthToResolutionAndColor(article.width);
    
    return (
      <a href={link} className="article-item" onClick={this.onClick}>
        <div className="first-section">
          <span className="id">{article.articleId}</span>
          { this.renderTags() }
          { this.renderTitle(article.title) }
        </div>
        <div className="second-section">
          <span className="duration">{time.second2String(article.duration)}</span>
          <Tooltip placement="top" title={`${article.width}x${article.height}`}>
            <Tag className="resolution" color={color}>{resolution}</Tag>
          </Tooltip>
          <span className="date">{article.date}</span>
        </div>
      </a>
    )
  }
  
  onClick = (e) => {
    const link = `/articles/videos/${this.props.article.articleId}`;
    e.preventDefault();
    this.props.history.push(link);
  }
}

let mapStateToProps = (state) => {
  return {
    tags: state.video.tags,
  }
}

export default connect(mapStateToProps)(withRouter(VideoItem));

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
