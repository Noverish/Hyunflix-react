import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import './video-article-list.css';

import { VideoArticle } from 'models';
import { MainLayout, VideoArticleListContainer } from 'components';

class VideoArticleListPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <MainLayout>
        <div className="video-article-list-page">
          <Button.Group className="category-button-bar">
            <Button><Link to="/videos/bundles/drama">드라마</Link></Button>
            <Button><Link to="/videos/bundles/fun">예능</Link></Button>
          </Button.Group>
          <VideoArticleListContainer onItemClick={this.onItemClick} subTitle="영화, 드라마, 예능" />
        </div>
      </MainLayout>
    )
  }
  
  onItemClick = (article: VideoArticle) => {
    this.props.history.push(`/videos/articles/${article.id}`)
  }
}

let mapDispatchToProps = {
  
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleListPage);