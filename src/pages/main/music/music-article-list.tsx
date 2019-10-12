import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { MusicArticleList, MusicPlayer } from 'components';
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
      <div className="music-article-list-page">
        <MusicPlayer />
        <MusicArticleList />
      </div>
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