import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { MainLayout, VideoArticleList } from 'components';
import { VideoBundle, VideoArticle } from 'models';
import { videoBundle } from 'api';

interface Props extends RouteComponentProps {
  
}

interface State {
  bundle: VideoBundle | null;
}

class VideoBundleContentPage extends React.Component<Props, State> {
  state = {
    bundle: null,
  }
  
  componentDidMount() {
    const category: string = this.props.match.params['category'];
    const bundleId: number = parseInt(this.props.match.params['bundleId'], 10);
    
    videoBundle(category, bundleId)
      .then(bundle => this.setState({ bundle }));
  }
  
  render() {
    const bundle: VideoBundle | null = this.state.bundle;
    
    return (
      <MainLayout>
        { bundle && <VideoArticleList articles={bundle!.articles} onItemClick={this.onItemClick} /> }
      </MainLayout>
    )
  }
  
  onItemClick = (article: VideoArticle) => {
    this.props.history.push(`/videos/articles/${article.articleId}`)
  }
}

let mapDispatchToProps = {
  
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoBundleContentPage);