import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, Row, Col, Statistic } from 'antd';
import * as socketio from 'socket.io-client';
import { connect } from 'react-redux';
import * as qs from 'query-string';

import { videoArticle } from 'actions';
import { VideoPlayer } from 'components';
import { VideoArticle, Subtitle, Video } from 'models';
import { BACKEND_SERVER, USER_VIDEO_SOCKET_PATH } from 'config';

interface Props extends RouteComponentProps {
  videoArticle(articleId: number): ReturnType<typeof videoArticle.request>;
  article: VideoArticle | null;
  subtitles: Subtitle[];
  userId: number;
}

interface State {
  width: number;
}

class VideoArticleContentPage extends React.Component<Props, State> {
  videoContainer: HTMLDivElement | null = null;
  socket: socketio.Socket | null = null;

  state = {
    width: -1,
  };

  componentDidMount() {
    // TODO redux resize 사용하기
    window.addEventListener('resize', this.resize);
    const articleId: number = parseInt(this.props.match.params['articleId']);

    this.props.videoArticle(articleId);

    this.socket = socketio.connect(BACKEND_SERVER, { path: USER_VIDEO_SOCKET_PATH });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  resize = () => {
    if (this.videoContainer) {
      if (this.state.width !== this.videoContainer.clientWidth) {
        this.setState({ width: this.videoContainer.clientWidth });
      }
    }
  }

  render() {
    const { article, subtitles, location } = this.props;
    const { width } = this.state;

    if (!article) {
      return <div />;
    }

    const videos: Video[] = article.videos;
    // TODO 여러 비디오 하게 하기
    const video = videos[0];

    const currentTime = qs.parse(location.search, { parseNumbers: true }).t as number | undefined;

    const height: number = width * video.height / video.width;
    const videoPlayer = (width > 0)
      ? <VideoPlayer
          src={video.url}
          subtitles={subtitles}
          width={width}
          height={height}
          onTimeUpdate={this.onTimeUpdate}
          currentTime={currentTime}
      />
      : null;

    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader onBack={this.onBack} title={article.title} />
        </div>
        <div
          ref={(ref) => {
            this.videoContainer = ref;
            this.resize();
          }}
        >
          {videoPlayer}
        </div>
        <Row className="border-bottom" style={{ padding: '12px' }} type="flex" gutter={32}>
          <Col><Statistic title="Durtaion" value={video.durationString} /></Col>
          <Col><Statistic title="Size" value={video.sizeString} /></Col>
          <Col><Statistic title="Screen" value={`${video.width}x${video.height}`} /></Col>
          <Col><Statistic title="Bitrate" value={video.bitrateString} /></Col>
          <Col><Statistic title="Resolution" value={video.resolution} /></Col>
          <Col><Statistic title="Date" value={article.date} /></Col>
        </Row>
      </div>
    );
  }

  onBack = () => {
    this.props.history.goBack();
  }

  onTimeUpdate = (time: number) => {
    const { userId, article } = this.props;

    if (article === null) {
      return;
    }

    this.socket.send(JSON.stringify({
      userId,
      articleId: article.id,
      time,
    }));
  }
}

const mapDispatchToProps = {
  videoArticle: videoArticle.request,
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    article: state.video.article,
    subtitles: state.video.subtitles,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleContentPage);
