import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import { VideoArticle } from 'models';
import { VideoArticleListContainer } from 'components';

const VideoArticleListPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const onItemClick = (article: VideoArticle) => {
    props.history.push(`/videos/articles/${article.id}`);
  };

  return (
    <div className="video-article-list-page">
      <Button.Group className="category-button-bar" style={{ marginBottom: '16px' }}>
        <Button><Link to="/videos/bundles/drama">드라마</Link></Button>
        <Button><Link to="/videos/bundles/fun">예능</Link></Button>
      </Button.Group>
      <VideoArticleListContainer onItemClick={onItemClick} subTitle="영화, 드라마, 예능" />
    </div>
  );
};

export default VideoArticleListPage;
