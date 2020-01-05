import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Statistic } from 'antd';
import * as socketio from 'socket.io-client';
import { connect } from 'react-redux';

import { VideoPlayer, PageHeader } from 'components';
import { Video, Subtitle, UserVideo, UserVideoTime } from 'models';
import { SOCKET_SERVER, SOCKET_PATH } from 'config';
import { videoOne , userVideoOne, videoSubtitleList } from 'api';
import { RootState } from 'reducers';

interface Props extends RouteComponentProps {
  sessionId: string;
}

interface State {
  video: Video | null;
}

class VideoVideoContentPage extends React.Component<Props, State> {
  socket: socketio.Socket | null = null;
  player = React.createRef<VideoPlayer>();

  state: State = {
    video: null,
  };

  componentDidMount() {
    this.socket = socketio.connect(SOCKET_SERVER + '/user-video', { path: SOCKET_PATH });

    const { sessionId } = this.props;
    const videoId: number = parseInt(this.props.match.params['videoId']);

    videoOne(videoId)
      .then((video: Video) => {
        video.url += `?sessionId=${sessionId}`;
        this.player.current!.src(video.url);
        this.setState({ video });
      });

    videoSubtitleList(videoId)
      .then((subtitles: Subtitle[]) => {
        subtitles.forEach(v => v.url += `?sessionId=${sessionId}`);
        this.player.current!.addSubtitles(subtitles);
      });

    userVideoOne(videoId)
      .then((userVideo: UserVideo | null) => {
        if (userVideo) {
          this.player.current!.setCurrentTime(userVideo.time);
        }
      });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  render() {
    const { video } = this.state;

    const title = (video) ? video.title : ' ';
    const statistics = (video)
      ? (
        <div className="statistics border-bottom">
          <Statistic title="Durtaion" value={video.durationString} />
          <Statistic title="Size" value={video.sizeString} />
          <Statistic title="Screen" value={`${video.width}x${video.height}`} />
          <Statistic title="Bitrate" value={video.bitrateString} />
          <Statistic title="Resolution" value={video.resolution} />
          <Statistic title="Date" value={video.date} />
        </div>
      )
      : undefined;

    return (
      <div className="video-list-page">
        <PageHeader className="border-top" onBack={this.onBack} title={title} />
        <VideoPlayer
          ref={this.player}
          onTimeUpdate={this.onTimeUpdate}
          ratio={video ? (video.height / video.width) : undefined}
        />
        {statistics}
      </div>
    );
  }

  onBack = () => {
    this.props.history.goBack();
  }

  onTimeUpdate = (time: number) => {
    const { video } = this.state;
    const { sessionId } = this.props;

    if (video) {
      const userVideoTime: UserVideoTime = {
        sessionId,
        videoId: video.id,
        time,
      };
      this.socket.send(JSON.stringify(userVideoTime));
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  sessionId: state.auth.sessionId,
});

export default connect(mapStateToProps)(VideoVideoContentPage);
