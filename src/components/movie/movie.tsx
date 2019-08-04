import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './movie.css';

import { MoviePreview } from 'models';

interface Props extends RouteComponentProps {
  moviePreview: MoviePreview
}

interface State {
  
}

class MoviePreviewComp extends React.Component<Props, State> {
  onClick() {
    this.props.history.push(`/movies${this.props.moviePreview.path}`);
  }
  
  render() {
    const link = `/movies${this.props.moviePreview.path}`
    
    return (
      <li className="movie-preview" onClick={this.onClick.bind(this)}>
        <a href={link} className="movie-preview-title">{this.props.moviePreview.title}</a>
        <span className="movie-preview-date">{this.props.moviePreview.date}</span>
      </li>
    )
  }
}

export default withRouter(MoviePreviewComp);