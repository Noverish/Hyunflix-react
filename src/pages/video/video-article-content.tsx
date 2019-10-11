import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, Typography } from 'antd';
import * as socketio from 'socket.io-client';
import { connect } from 'react-redux';
import * as qs from 'query-string';

import { videoArticle } from 'actions';
import { MainLayout, VideoPlayer } from 'components';
import { VideoArticle, Subtitle, Video } from 'models';
import { BACKEND_SERVER, USER_VIDEO_SOCKET_PATH } from 'config';

const { Title, Text } = Typography;

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
  }
  
  componentDidMount() {
    // TODO redux resize 사용하기
    window.addEventListener("resize", this.resize);
    const articleId: number = parseInt(this.props.match.params['articleId']);
    
    this.props.videoArticle(articleId);
    
    this.socket = socketio.connect(BACKEND_SERVER, { path: USER_VIDEO_SOCKET_PATH });
  }
  
  componentWillUnmount() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }
  
  resize = () => {
    if(this.videoContainer) {
      if(this.state.width !== this.videoContainer.clientWidth) {
        this.setState({ width: this.videoContainer.clientWidth })
      }
    }
  }
  
  render() {
    const { article, subtitles, location } = this.props;
    const { width } = this.state;
    
    if (!article) {
      return <MainLayout/>
    }
    
    const videos: Video[] = article.videos;
    // TODO 여러 비디오 하게 하기
    const video = videos[0];
    
    const currentTime = qs.parse(location.search, { parseNumbers: true }).t as number | undefined;
    
    const height: number = width * video.height / video.width;
    let videoPlayer = (width > 0)
      ? <VideoPlayer
          src={video.url}
          subtitles={subtitles}
          width={width}
          height={height}
          onTimeUpdate={this.onTimeUpdate}
          currentTime={currentTime}
        />
      : null
    
    return (
      <MainLayout>
        <div className="article-list-page">
          <div className="page-header">
            <PageHeader onBack={this.onBack} title={article.title} />
          </div>
          <div ref={ref => {
            this.videoContainer = ref;
            this.resize();
          }}>
            {videoPlayer}
          </div>
          <div style={{ padding: '12px' }}>
            <div>
              <Title className="video-title" level={4}>{article.title}</Title>
            </div>
            <Text type="secondary">{article.date}</Text>
          </div>
        </div>
      </MainLayout>
    )
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
      userId: userId,
      articleId: article.id,
      time
    }));
  }
}

let mapDispatchToProps = {
  videoArticle: videoArticle.request,
}

let mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    article: state.video.article,
    subtitles: state.video.subtitles,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleContentPage);
