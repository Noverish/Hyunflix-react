import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

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
  
  render() {
    return (
      <MainLayout>
        <VideoArticleList />
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