import React from 'react';

import FileListComp from 'components/file-list';
import { File } from 'models';
import { get } from 'services';

interface Props {
  path: string;
  callback: (File) => void
}

interface State {
  path: string
  files: File[] | null;
}

export default class FileList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      path: props.path,
      files: null
    }
  }
  
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.path !== prevState.path) {
      return { path: nextProps.path, files: null }
    } else {
      return {}
    }
  }
  
  fetch(path: string) {
    get(path)
      .then((res) => {
        this.setState({
          files: res.payload as File[]
        })
      });
  }
  
  render() {
    if (this.state.files === null) {
      this.fetch(this.state.path);
      return (
        <FileListComp path={this.state.path} files={[]} callback={this.props.callback} />
      )
    } else {
      return (
        <FileListComp path={this.state.path} files={this.state.files} callback={this.props.callback} />
      )
    }
  }
}
