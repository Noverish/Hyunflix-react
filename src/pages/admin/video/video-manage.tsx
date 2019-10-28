import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { VideoArticle } from 'models';
import { VideoArticleListContainer } from 'components';
import './video-manage.css';

interface Props extends RouteComponentProps {

}

interface State {
}

class VideoManagePage extends React.Component<Props, State> {
  checklist: VideoArticle[] = [];

  render() {
    return (
      <div className="video-manage-page">
        <VideoArticleListContainer
          checkable={true}
          onItemCheck={this.onItemCheck}
          topRight={
            <Button.Group className="button-group">
              <Button icon="edit" onClick={this.onEdit}>Edit</Button>
              <Button icon="delete">Remove</Button>
            </Button.Group>
          }
        />
      </div>
    );
  }

  onEdit = () => {
    this.props.history.push({
      pathname: '/admin/video/manage/edit',
      state: this.checklist,
    });
  }

  onItemCheck = (article: VideoArticle, checked: boolean, checklist: VideoArticle[]) => {
    this.checklist = checklist;
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoManagePage);
