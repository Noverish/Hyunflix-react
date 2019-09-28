import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { VideoArticle } from 'models';
import { VideoArticleList } from 'components';
import './video-manage.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class VideoManagePage extends React.Component<Props, State> {
  state = {
    
  }
  
  render() {
    return (
      <div className="video-manage-page">
        <VideoArticleList checkable={true} onEdit={this.onEdit}/>
      </div>
    )
  }
  
  onEdit = (articles: VideoArticle[]) => {
    this.props.history.push({
      pathname: '/admin/video-manage/edit',
      state: articles,
    })
  }
}

const mapDispatchToProps = {
  
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoManagePage);
