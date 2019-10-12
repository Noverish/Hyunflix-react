import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { VideoArticleList } from 'components';
import { VideoBundle, VideoArticle } from 'models';
import { videoBundle } from 'api';

const VideoBundleContentPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [bundle, setBundle] = useState(null as VideoBundle | null);
  
  const category: string = props.match.params['category'];
  const bundleId: number = parseInt(props.match.params['bundleId'], 10);
  
  useEffect(() => {
    videoBundle(category, bundleId)
      .then(bundle => setBundle(bundle))
      .catch();
  }, [category, bundleId]);
    
  if (bundle) {
    return (
      <VideoArticleList
        articles={bundle.articles}
        onItemClick={(article: VideoArticle) => props.history.push(`/videos/articles/${article.id}`)}
        onBack={() => props.history.goBack()}
        title={bundle.title}
        subTitle={`총 ${bundle.articles.length}편`}
      />
    )
  } else {
    return <div />
  }
}

export default VideoBundleContentPage;