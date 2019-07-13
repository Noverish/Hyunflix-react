import React from 'react';

import FolderList from '../components-mobile/folder-list';
import { get } from '../services';
import { ServerResponse, File, Type } from '../models';

interface Props {
  location;
  history;
}

interface State {
  path: string;
  files: File[]
}

export default class FolderListPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      path: '',
      files: []
    }
  }
  
  fileClickCallback(file: File) {
    if(file.type === Type.folder || file.type === Type.video) {
      this.props.history.push(file.path);
    }
  }
  
  refresh(path: string) {
    get(path)
      .then((res: ServerResponse) => {
        this.setState({
          path: path,
          files: res.payload as File[]
        })
      })
  }
  
  render() {
    const newPath = this.props.location.pathname;
    if (newPath !== this.state.path) {
      this.refresh(newPath);
    }
    
    return (
      <FolderList files={this.state.files} callback={this.fileClickCallback.bind(this)} />
    )
  }
}