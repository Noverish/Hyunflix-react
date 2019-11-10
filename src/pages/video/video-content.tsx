import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, Row, Col, Statistic } from 'antd';
import * as socketio from 'socket.io-client';
import { connect } from 'react-redux';

import { VideoPlayer } from 'components';
import { Video, Subtitle, UserVideo, UserVideoTime } from 'models';
import { SOCKET_SERVER, USER_VIDEO_SOCKET_PATH } from 'config';
import { videoOne , userVideoOne, videoSubtitleList } from 'api';

interface Props extends RouteComponentProps {
  userId: number;
  token: string;
}

interface State {
  userVideo: UserVideo | null;
  video: Video | null;
  subtitles: Subtitle[] | null;
}

class VideoVideoContentPage extends React.Component<Props, State> {
  socket: socketio.Socket | null = null;

  state: State = {
    userVideo: null,
    video: null,
    subtitles: [],
  };

  componentDidMount() {
    this.socket = socketio.connect(SOCKET_SERVER, { path: USER_VIDEO_SOCKET_PATH });

    (async () => {
      const { token } = this.props;
      const videoId: number = parseInt(this.props.match.params['videoId']);

      const [video, subtitles, userVideo] = await Promise.all([
        videoOne(videoId),
        videoSubtitleList(videoId),
        userVideoOne(videoId),
      ]);

      subtitles && subtitles.forEach(v => v.url = `${v.url}?token=${token}`);

      this.setState({ video, subtitles, userVideo });
    })();
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  render() {
    const { video, subtitles, userVideo } = this.state;

    const title = (video) ? video.title : ' ';

    const statistics = (video)
      ? (
        <Row className="border-bottom" style={{ padding: '12px' }} type="flex" gutter={32}>
          <Col><Statistic title="Durtaion" value={video.durationString} /></Col>
          <Col><Statistic title="Size" value={video.sizeString} /></Col>
          <Col><Statistic title="Screen" value={`${video.width}x${video.height}`} /></Col>
          <Col><Statistic title="Bitrate" value={video.bitrateString} /></Col>
          <Col><Statistic title="Resolution" value={video.resolution} /></Col>
          <Col><Statistic title="Date" value={video.date} /></Col>
        </Row>
      )
      : undefined;

    return (
      <div className="video-list-page">
        <PageHeader className="border-top" onBack={this.onBack} title={title} />
        <VideoPlayer
          src={video ? video.url : undefined}
          subtitles={subtitles ? subtitles : undefined}
          onTimeUpdate={this.onTimeUpdate}
          currentTime={userVideo ? userVideo.time : undefined}
          ratio={video ? (video.height / video.width * 100) : undefined}
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
    const { userId } = this.props;

    if (video) {
      const userVideoTime: UserVideoTime = {
        userId,
        videoId: video.id,
        time,
      };
      this.socket.send(JSON.stringify(userVideoTime));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(VideoVideoContentPage);
