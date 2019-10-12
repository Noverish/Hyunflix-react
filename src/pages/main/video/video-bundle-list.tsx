import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { VideoBundleList } from 'components';
import { VideoBundle } from 'models';
import { videoBundleList } from 'api';

const VideoBundleListPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [bundles, setBundles] = useState([] as VideoBundle[]);
  
  const category: string = props.match.params['category'];
  
  useEffect(() => {
    videoBundleList(category)
      .then(bundles => setBundles(bundles))
      .catch();
  }, [category]);
  
  return (
    <VideoBundleList
      bundles={bundles}
      onBack={() => props.history.goBack()}
      title={category}
    />
  )
}

export default VideoBundleListPage;