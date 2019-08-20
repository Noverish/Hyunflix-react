import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Tag } from 'antd';
import './movie-item.css';

import { Movie } from 'models';
import { time } from 'utils';

interface Props extends RouteComponentProps {
  movie: Movie
}

interface State {
  
}

class MovieItem extends React.Component<Props, State> {
  
  onClick = (e) => {
    const link = `/movies/${this.props.movie.movie_id}`;
    e.preventDefault();
    this.props.history.push(link);
  }
  
  render() {
    const link = `/movies/${this.props.movie.movie_id}`;
    
    const resolutionTags = this.props.movie.resolution.map(r => {
      return <Tag color={resoltuion2Color(r)} key={r}>{r}</Tag>
    })
    
    return (
      <a href={link} className="movie-preview" onClick={this.onClick}>
        <div>
          <span className="movie-preview-id">{this.props.movie.movie_id}</span>
          <span className="movie-preview-title">{this.props.movie.title}</span>
        </div>
        <div>
          <span className="movie-preview-duration">{time.second2String(this.props.movie.duration)}</span>
          <span className="movie-preview-resolution">{resolutionTags}</span>
          <span className="movie-preview-date">{this.props.movie.date}</span>
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