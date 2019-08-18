import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { MainLayout, FileItem } from 'components';
import { readdir } from 'api';
import { File } from 'models';
import './file-list.css';

interface Props extends RouteComponentProps {
  files: File[]
}

interface State {
  
}

class FileListPage extends React.Component<Props, State> {
  // static getDerivedStateFromProps(props: Props, state: State) {
  //   const path = `/${props.match.params[0] || ''}`;
    
  //   if(path !== state.nowPath) {
  //     return { shouldRefresh: true };
  //   }
  //   return {};
  // }
  
  // refresh = () => {
  //   const path = `/${this.props.match.params[0] || ''}`;
  //   readdir(path)
  //     .then((files: File[]) => {
  //       this.setState({
  //         shouldRefresh: false,
  //         nowPath: path,
  //         files
  //       })
  //     })
  //     .catch((msg) => {
  //       alert(msg);
  //       this.setState({
  //         shouldRefresh: false,
  //         nowPath: path,
  //         files: []
  //       })
  //     })
  // }
  
  // componentDidMount() {
  //   if(this.state.shouldRefresh) {
  //     this.refresh();
  //   }
  // }
  
  // componentDidUpdate() {
  //   if(this.state.shouldRefresh) {
  //     this.refresh();
  //   }
  // }
  
  render() {
    const fileItems = this.props.files.map((file, index) => {
      return <FileItem file={file} callback={this.onItemClicked} key={index}/>
    })
    
    return (
      <div>
        {fileItems}
      </div>
    )
  }
  
  // onBack = () => {
    
  // }
  
  onItemClicked = (file: File) => {
    this.props.history.push(`/explorer${file.path}`)
  }
}

export default withRouter(FileListPage);