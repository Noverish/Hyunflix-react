import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Result } from 'antd';

import { explore } from 'actions';
import VideoPage from '../video/video-page';
import FolderPage from './folder-page';
import { MainLayout } from 'components';
import { File, Video } from 'models';

interface Props extends RouteComponentProps {
  onExplore;
  files: File[] | null;
  video: Video | null;
}

interface State {
  
}

class ExplorerPage extends React.Component<Props, State> {
  path: string = '';
  
  componentDidMount() {
    this.refresh();
  }
  
  componentDidUpdate() {
    this.refresh();
  }
  
  refresh = () => {
    const path = `/${this.props.match.params[0] || ''}`;
    
    if(this.path !== path) {
      this.props.onExplore(path);
      this.path = path;
    }
  }
  
  render() {
    const files: File[] | null = this.props.files;
    const video: Video | null = this.props.video;
    
    if(!files && !video) {
      return (
        <MainLayout>
          <Result
            status="404"
            title="404"
            subTitle="존재하지 않는 경로입니다"
          />
        </MainLayout>
      )
    }
    
    if (files) {
      return (
        <FolderPage files={files} />
      )
    } else if (video) {
      return (
        <VideoPage video={video} />  
      )
    } else {
      return (
        <MainLayout />
      )
    }
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onExplore: (path) => dispatch(explore(path)),
  }
}

let mapStateToProps = (state) => {
  return {
    files: state.explorer.files,
    video: state.explorer.video,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerPage);