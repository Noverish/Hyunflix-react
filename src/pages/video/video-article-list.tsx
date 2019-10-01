import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import './video-article-list.css';

import { VideoArticle } from 'models';
import { MainLayout, VideoArticleListContainer } from 'components';

class VideoArticleListPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <MainLayout>
        <div className="video-article-list-page">
          <Radio.Group className="category-button-bar">
            <Radio.Button value="all">모두</Radio.Button>
            <Radio.Button value="movie">영화</Radio.Button>
            <Radio.Button value="drama">드라마</Radio.Button>
            <Radio.Button value="entertainment"><Link to="/bundles/videos/fun">예능</Link></Radio.Button>
          </Radio.Group>
          <VideoArticleListContainer onItemClick={this.onItemClick}/>
        </div>
      </MainLayout>
    )
  }
  
  onItemClick = (article: VideoArticle) => {
    this.props.history.push(`/articles/videos/${article.articleId}`)
  }
}

let mapDispatchToProps = {
  
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleListPage);