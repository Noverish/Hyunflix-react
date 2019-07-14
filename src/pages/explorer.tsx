import React from 'react';
import { withRouter } from 'react-router-dom'

import FileList from 'container/file-list';
import VideoPlayer from 'container/video-player';
import { File, Type, parseType } from 'models';

interface Props {
  location
  history
}

interface State {
  path: string
  type: Type
}

class ExplorerPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      path: '/archive',
      type: Type.folder
    }
  }
  
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const newPath = nextProps.location.pathname;
    
    if(!newPath.startsWith('/archive')) {
      return {}
    }
    
    if (newPath !== prevState.path) {
      return { path: newPath, type: parseType(newPath) }
    } else {
      return {}
    }
  }
  
  callback(file: File) {
    this.props.history.push(file.path);
    this.setState({
      path: file.path,
      type: file.type
    })
  }
  
  render() {
    if(this.state.type === Type.folder) {
      return (
        <FileList path={this.state.path} callback={this.callback.bind(this)}/>
      )
    } else if (this.state.type === Type.video) {
      return (
        <VideoPlayer path={this.state.path}/> 
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default withRouter(ExplorerPage);