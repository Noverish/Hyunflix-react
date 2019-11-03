import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, Row, Col, Statistic } from 'antd';
import * as socketio from 'socket.io-client';
import { connect } from 'react-redux';

import { VideoPlayer } from 'components';
import { VideoArticle, Subtitle, UserVideo } from 'models';
import { SOCKET_SERVER, USER_VIDEO_SOCKET_PATH } from 'config';
import { videoArticle, userVideo, videoSubtitleList } from 'api';

interface Props extends RouteComponentProps {
  rootWidth: number;
  userId: number;
}

interface State {
  userVideo: UserVideo | null;
  article: VideoArticle | null;
  subtitles: Subtitle[];
}

class VideoArticleContentPage extends React.Component<Props, State> {
  videoContainer = React.createRef<HTMLDivElement>();
  socket: socketio.Socket | null = null;

  state: State = {
    userVideo: null,
    article: null,
    subtitles: [],
  };

  componentDidMount() {
    this.socket = socketio.connect(SOCKET_SERVER, { path: USER_VIDEO_SOCKET_PATH });

    const userId: number = this.props.userId;
    const articleId: number = parseInt(this.props.match.params['articleId']);

    userVideo(userId, articleId)
      .then(userVideo => this.setState({ userVideo }))
      .catch(() => {});

    (async () => {
      const article: VideoArticle = await videoArticle(articleId);
      this.setState({ article });

      const subtitles: Subtitle[] = await videoSubtitleList(article.videos[0].id);
      this.setState({ subtitles });
    })().catch();
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // TODO 여러 비디오 하게 하기
  render() {
    const { article, subtitles, userVideo } = this.state;

    const videoContainer: HTMLDivElement | null = this.videoContainer.current;
    const width = (videoContainer) ? videoContainer.clientWidth : -1;
    const height: number = (article) ? (width * article.videos[0].height / article.videos[0].width) : -1;

    // const currentTime = qs.parse(location.search, { parseNumbers: true }).t as number | undefined;
    const currentTime = (userVideo) ? userVideo.time : undefined;

    const videoPlayer = (width > 0 && article)
      ? <VideoPlayer
          src={article.videos[0].url}
          subtitles={subtitles}
          width={width}
          height={height}
          onTimeUpdate={this.onTimeUpdate}
          currentTime={currentTime}
      />
      : null;

    const title = (article) ? article.title : '';
    const durationString = (article) ? article.videos[0].durationString : '';
    const sizeString = (article) ? article.videos[0].sizeString : '';
    const videoWidth = (article) ? article.videos[0].width : 0;
    const videoHeight = (article) ? article.videos[0].height : 0;
    const bitrateString = (article) ? article.videos[0].bitrateString : '';
    const resolution = (article) ? article.videos[0].resolution : '';
    const date = (article) ? article.date : '';

    return (
      <div className="article-list-page">
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
    const { article } = this.state;
    const { userId } = this.props;

    if (article) {
      this.socket.send(JSON.stringify({
        userId,
        articleId: article.id,
        time,
      }));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    rootWidth: state.etc.width,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(VideoArticleContentPage);
