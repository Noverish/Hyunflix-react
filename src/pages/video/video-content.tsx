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
  rootWidth: number;
  userId: number;
  token: string;
}

interface State {
  userVideo: UserVideo | null;
  video: Video | null;
  subtitles: Subtitle[];
}

class VideoVideoContentPage extends React.Component<Props, State> {
  videoContainer = React.createRef<HTMLDivElement>();
  socket: socketio.Socket | null = null;

  state: State = {
    userVideo: null,
    video: null,
    subtitles: [],
  };

  componentDidMount() {
    this.socket = socketio.connect(SOCKET_SERVER, { path: USER_VIDEO_SOCKET_PATH });
    const { token } = this.props;

    const videoId: number = parseInt(this.props.match.params['videoId']);

    userVideoOne(videoId)
      .then(userVideo => this.setState({ userVideo }))
      .catch(() => {});

    (async () => {
      const video: Video = await videoOne(videoId);
      this.setState({ video });

      const subtitles: Subtitle[] = await videoSubtitleList(video.id);
      subtitles.forEach(v => v.url = `${v.url}?token=${token}`);
      this.setState({ subtitles });
    })().catch();
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  render() {
    const { video, subtitles, userVideo } = this.state;

    const videoContainer: HTMLDivElement | null = this.videoContainer.current;
    const width = (videoContainer) ? videoContainer.clientWidth : -1;
    const height: number = (video) ? (width * video.height / video.width) : -1;

    // const currentTime = qs.parse(location.search, { parseNumbers: true }).t as number | undefined;
    const currentTime = (userVideo) ? userVideo.time : undefined;

    console.log(userVideo);

    const videoPlayer = (width > 0 && video)
      ? <VideoPlayer
          src={video.url}
          subtitles={subtitles}
          width={width}
          height={height}
          onTimeUpdate={this.onTimeUpdate}
          currentTime={currentTime}
      />
      : null;

    const title = (video) ? video.title : '';
    const durationString = (video) ? video.durationString : '';
    const sizeString = (video) ? video.sizeString : '';
    const videoWidth = (video) ? video.width : 0;
    const videoHeight = (video) ? video.height : 0;
    const bitrateString = (video) ? video.bitrateString : '';
    const resolution = (video) ? video.resolution : '';
    const date = (video) ? video.date : '';

    return (
      <div className="video-list-page">
        <div className="page-header">
          <PageHeader onBack={this.onBack} title={title} />
        </div>
        <div ref={this.videoContainer}>
          {videoPlayer}
        </div>
        <Row className="border-bottom" style={{ padding: '12px' }} type="flex" gutter={32}>
          <Col><Statistic title="Durtaion" value={durationString} /></Col>
          <Col><Statistic title="Size" value={sizeString} /></Col>
          <Col><Statistic title="Screen" value={`${videoWidth}x${videoHeight}`} /></Col>
          <Col><Statistic title="Bitrate" value={bitrateString} /></Col>
          <Col><Statistic title="Resolution" value={resolution} /></Col>
          <Col><Statistic title="Date" value={date} /></Col>
        </Row>
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
    rootWidth: state.etc.width,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(VideoVideoContentPage);
