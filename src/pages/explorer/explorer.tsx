import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Result } from 'antd';
import { extname } from 'path';

import { readdir } from 'actions';
import { MainLayout, VideoPage } from 'components';
import FileListPage from './file-list';
import * as api from 'api';
import { File, Video } from 'models';

interface Props extends RouteComponentProps {
  onReaddir;
}

interface State {
  path: string;
  exists: boolean;
  isdir: boolean;
  files: File[];
  video: Video | null;
}

class ExplorerPage extends React.Component<Props, State> {
  state = {
    path: '',
    exists: true,
    isdir: true,
    files: [],
    video: null,
  }
  
  componentDidMount() {
    this.refresh()
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }
  
  componentDidUpdate() {
    this.refresh()
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }
  
  refresh = async () => {
    const path = `/${this.props.match.params[0] || ''}`;
    if(this.state.path === path) {
      return;
    }
    
    const exists = await api.exists(path);
    if(!exists) {
      this.setState({ path, exists: false, isdir: false, files: [], video: null })
      return;
    }
    
    const isdir = await api.isdir(path);
    if(isdir) {
      this.props.onReaddir(path);
      // const files: File[] = await api.readdir(path);
      // this.setState({ path, exists: true, isdir: true, files: files, video: null })
    } else {
      if(extname(path) === '.mp4') {
        const video: Video = await api.video(path);
        this.setState({ path, exists: true, isdir: false, files: [], video: video })
      } else {
        this.setState({ path, exists: true, isdir: false, files: [], video: null })
      }
    }
  }
  
  render() {
    if(!this.state.exists) {
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
    
    if(!this.state.isdir) {
      if(this.state.video) {
        return (
          <MainLayout>
            <VideoPage video={this.state.video!} />
          </MainLayout>
        )
      } else {
        return (
          <MainLayout>
            <Result
              status="500"
              title="500"
              subTitle="준비중"
            />
          </MainLayout>
        )
      }
    }
        
    return (
      <MainLayout>
        <FileListPage files={this.state.files} />
      </MainLayout>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onReaddir: (path) => dispatch(readdir(path)),
  }
}

export default connect(undefined, mapDispatchToProps)(ExplorerPage);