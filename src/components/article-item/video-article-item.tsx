import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Tag, Tooltip } from 'antd';

import { VideoArticle } from 'models';
import { time } from 'utils';
import './article-item.css';

interface Props extends RouteComponentProps {
  highlight: string;
  article: VideoArticle;
}

interface State {
  
}

class MovieItem extends React.Component<Props, State> {
  
  onClick = (e) => {
    const link = `/articles/videos/${this.props.article.articleId}`;
    e.preventDefault();
    this.props.history.push(link);
  }
  
  render() {
    const { highlight } = this.props;
    const article = this.props.article;
    const link = `/articles/videos/${this.props.article.articleId}`;
    
    const { resolution, color } = widthToResolutionAndColor(article.width);
    
    return (
      <a href={link} className="article-item" onClick={this.onClick}>
        <div className="first-section">
          <span className="id">{article.articleId}</span>
          <span className="title">{renderTitle(article.title, highlight)}</span>
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
}

function renderTitle(title: string, query: string) {
  const index = title.indexOf(query);
  const beforeStr = title.substr(0, index);
  const afterStr = title.substr(index + query.length);
  return (index > -1)
    ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{query}</span>
        {afterStr}
      </span>
    )
    : (
      <span>{title}</span>
    );
}

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

export default withRouter(MovieItem);