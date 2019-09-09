import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { episodeDetail, EpisodeDetailAction } from 'actions';
import VideoPage from './video-page';
import { MainLayout } from 'components';
import { Video } from 'models';
import './movie-detail.css';

interface Props extends RouteComponentProps {
  onEpisodeDetail(series: string, episodeNumber: number): EpisodeDetailAction;
  video: Video | null;
}

interface State {
  
}

class MovieDetailPage extends React.Component<Props, State> {
  componentDidMount() {
    const series: string = this.props.match.params['series'];
    const episodeNumber: number = parseInt(this.props.match.params['episodeNumber'], 10);
    this.props.onEpisodeDetail(series, episodeNumber);
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

let mapDispatchToProps = (dispatch: Dispatch<EpisodeDetailAction>) => {
  return {
    onEpisodeDetail: (series: string, episodeNumber: number) => dispatch(episodeDetail(series, episodeNumber)),
  }
}

let mapStateToProps = (state) => {
  return {
    video: state.tvProgram.video,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieDetailPage));