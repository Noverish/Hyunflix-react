import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, Typography } from 'antd';
import { connect } from 'react-redux';

import { videoArticle } from 'actions';
import { MainLayout, VideoPlayer } from 'components';
import { VideoArticle, Subtitle, Video } from 'models';

const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
  videoArticle(articleId: number): ReturnType<typeof videoArticle.request>;
  article: VideoArticle | null;
  subtitles: Subtitle[];
}

interface State {
  width: number;
}

class VideoArticleContentPage extends React.Component<Props, State> {
  videoContainer: HTMLDivElement | null = null;
  
  state = {
    width: -1,
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    const articleId: number = parseInt(this.props.match.params['articleId']);
    
    this.props.videoArticle(articleId);
  }
  
  resize = () => {
    if(this.videoContainer) {
      if(this.state.width !== this.videoContainer.clientWidth) {
        this.setState({ width: this.videoContainer.clientWidth })
      }
    }
  }
  
  render() {
    const { article, subtitles } = this.props;
    const { width } = this.state;
    
    if (!article) {
      return <MainLayout/>
    }
    
    const videos: Video[] = article.videos;
    // TODO 여러 비디오 하게 하기
    const video = videos[0];
    
    const height: number = width * video.height / video.width;
    let videoPlayer = (width > 0)
      ? <VideoPlayer src={video.url} subtitles={subtitles} width={width} height={height} />
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
}

let mapDispatchToProps = {
  videoArticle: videoArticle.request,
}

let mapStateToProps = (state) => {
  return {
    article: state.video.article,
    subtitles: state.video.subtitles,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleContentPage);
