import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Tag } from 'antd';

import { VideoArticle } from 'models';
import { time } from 'utils';
import './article-item.css';

interface Props extends RouteComponentProps {
  article: VideoArticle
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
    const article = this.props.article;
    const link = `/articles/videos/${this.props.article.articleId}`;
    
    // TODO todo
    const r = '1080p';
    
    return (
      <a href={link} className="article-item" onClick={this.onClick}>
        <div>
          <span className="id">{article.videoId}</span>
          <span className="title">{article.title}</span>
        </div>
        <div>
          <span className="duration">{time.second2String(article.duration)}</span>
          <span className="resolution"><Tag color={resoltuion2Color(r)} key={r}>{r}</Tag></span>
          <span className="date">{article.date}</span>
        </div>
      </a>
    )
  }
}

function resoltuion2Color(resolution: string) {
  switch(resolution) {
    case '1080p': return 'purple';
    case '720p': return 'geekblue';
    case '480p': return 'green';
    case '360p': return 'red';
    default: return '';
  }
}

export default withRouter(MovieItem);