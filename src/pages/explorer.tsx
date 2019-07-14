import React from 'react';

import FileList from 'container/file-list';
import VideoPlayer from 'container/video-player';
import { File, Type } from 'models';

interface Props {
  
}

interface State {
  path: string
  type: Type
}

export default class ExplorerPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      path: '/archive',
      type: Type.folder
    }
  }
  
  callback(file: File) {
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
        <div>
          <VideoPlayer path={this.state.path}/> 
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
