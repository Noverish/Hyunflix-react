import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import { VideoArticle } from 'models';
import { VideoArticleListContainer } from 'components';
import { videoBundleCategories } from 'api';

const VideoArticleListPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [categories, setCategories] = useState([] as string[]);

  useEffect(() => {
    videoBundleCategories()
      .then(categories => setCategories(categories))
      .catch();
  }, []);

  const onItemClick = (article: VideoArticle) => {
    props.history.push(`/videos/articles/${article.id}`);
  };

  const bundles = categories.map(category => (
    <Button key={category}><Link to={`/videos/bundles/${category}`}>{category}</Link></Button>
  ));

  return (
    <div className="video-article-list-page">
      <Button.Group className="category-button-bar" style={{ marginBottom: '16px' }}>
        {bundles}
      </Button.Group>
      <VideoArticleListContainer onItemClick={onItemClick} subTitle="영화, 드라마, 예능" />
    </div>
  );
};

export default VideoArticleListPage;
