import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Statistic } from 'antd';
import { connect } from 'react-redux';

import { VideoPlayer, PageHeader } from 'src/components';
import { Video, Subtitle, UserVideo, UserVideoTime } from 'src/models';
import { SOCKET_SERVER } from 'src/config';
import { videoOne, userVideoOne, videoSubtitleList } from 'src/api';
import { RootState } from 'src/reducers';

interface Props extends RouteComponentProps {
  accessToken: string;
}

interface State {
  video: Video | null;
}

class VideoVideoContentPage extends React.Component<Props, State> {
  socket: WebSocket | null = null;

  player = React.createRef<VideoPlayer>();

  state: State = {
    video: null,
  };

  componentDidMount() {
    this.socket = new WebSocket(SOCKET_SERVER);

    const { accessToken } = this.props;
    const videoId: number = parseInt(this.props.match.params['videoId']);

    videoOne(videoId)
      .then((video: Video) => {
        video.url += `?token=${accessToken}`;
        this.player.current!.src(video.url);
        this.setState({ video });
      });

    videoSubtitleList(videoId)
      .then((subtitles: Subtitle[]) => {
        subtitles.forEach(v => v.url += `?token=${accessToken}`);
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
    this.socket?.close();
  }

  onBack = () => {
    this.props.history.goBack();
  };

  onTimeUpdate = (time: number) => {
    const { video } = this.state;
    const { accessToken } = this.props;

    if (video && this.socket) {
      const userVideoTime: UserVideoTime = {
        token: accessToken,
        videoId: video.id,
        time,
      };
      this.socket.send(JSON.stringify(userVideoTime));
    }
  };

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
}

const mapStateToProps = (state: RootState) => ({
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps)(VideoVideoContentPage);
