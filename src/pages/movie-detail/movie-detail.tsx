import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { MainLayout, VideoPage } from 'components';
import { getMovieDetail } from 'api';
import { Video } from 'models';
import './movie-detail.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  video: Video | null
}

class MovieDetailPage extends React.Component<Props, State> {
  state = {
    video: null
  }
  
  componentDidMount() {
    const movie_id = parseInt(this.props.match.params['movie_id']);
    // TODO 숫자 아닐 때 대처
    
    getMovieDetail(movie_id)
      .then((video: Video) => {
        this.setState({ video })
      })
      .catch((msg) => {
        // TODO 존재하지 않을 때 대처
      })
  }
  
  render() {
    const video: Video | null = this.state.video;
    
    if(video) {
      return (
        <MainLayout>
          <VideoPage video={video} />
        </MainLayout>
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

export default withRouter(MovieDetailPage);