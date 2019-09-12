import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, Typography } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { videoArticleContent, VideoArticleContentAction } from 'actions';
import { MainLayout, VideoPlayer } from 'components';
import { VideoArticle, Subtitle } from 'models';

const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
  onVideoArticleContent(articleId: number): VideoArticleContentAction;
  article: VideoArticle | null;
  subtitles: Subtitle[];
}

interface State {
  width: number;
}

class VideoArticleContentPage extends React.Component<Props, State> {
  videoContainer: HTMLDivElement | null = null;
  
  state = {
    width: 360,
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    const articleId: number = parseInt(this.props.match.params['articleId']);
    
    this.props.onVideoArticleContent(articleId);
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
    
    const height: number = width * article.height / article.width;
    
    return (
      <MainLayout>
        <PageHeader onBack={this.onBack} title={article.title} />
        <div ref={ref => {
          this.videoContainer = ref;
          this.resize();
        }}>
          <VideoPlayer src={article.url} subtitles={subtitles} width={width} height={height} />
        </div>
        <div style={{ padding: '12px' }}>
          <div>
            <Title className="video-title" level={4}>{article.title}</Title>
          </div>
          <Text type="secondary">{article.date}</Text>
        </div>
      </MainLayout>
    )
  }
  
  onBack = () => {
    
  }
}

let mapDispatchToProps = (dispatch: Dispatch<VideoArticleContentAction>) => {
  return {
    onVideoArticleContent: (articleId: number) => dispatch(videoArticleContent(articleId)),
  }
}

let mapStateToProps = (state) => {
  return {
    article: state.article.article,
    subtitles: state.article.subtitles,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleContentPage);
