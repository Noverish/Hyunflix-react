import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { movieDetail } from 'actions';
import VideoPage from './video-page';
import { MainLayout } from 'components';
import { Video } from 'models';
import './movie-detail.css';

interface Props extends RouteComponentProps {
  onMovieDetail
  video: Video | null
}

interface State {
}

class MovieDetailPage extends React.Component<Props, State> {
  componentDidMount() {
    const movieId: number = parseInt(this.props.match.params['movie_id'], 10);
    this.props.onMovieDetail(movieId);
  }
  
  render() {
    const video: Video | null = this.props.video;
    
    if(video) {
      return (
        <VideoPage video={video} />
      )
    } else {
      return (
        <MainLayout>
          <div></div>
        </MainLayout>
      )
    }
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onMovieDetail: (movieId: number) => dispatch(movieDetail(movieId)),
  }
}

let mapStateToProps = (state) => {
  return {
    video: state.movie.video,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieDetailPage));