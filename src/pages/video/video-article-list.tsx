import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Radio } from 'antd';

import './video-article-list.css';

import { MainLayout, VideoArticleList } from 'components';

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class VideoArticleListPage extends React.Component<Props, State> {
  state = {
    
  }
  
  componentDidMount() {
    
  }
  
  // TODO link
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
          <VideoArticleList />
        </div>
      </MainLayout>
    )
  }
  
  
}

let mapDispatchToProps = {
  
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleListPage);