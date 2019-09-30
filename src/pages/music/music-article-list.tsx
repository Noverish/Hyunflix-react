import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { MainLayout, MusicArticleList, MusicPlayer } from 'components';
import './music-article-list.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class MusicArticleListPage extends React.Component<Props, State> {
  state = {
    
  }
  
  componentDidMount() {
    
  }
  
  render() {
    return (
      <MainLayout>
        <div className="music-article-list-page">
          <MusicPlayer />
          <MusicArticleList />
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

export default connect(mapStateToProps, mapDispatchToProps)(MusicArticleListPage);