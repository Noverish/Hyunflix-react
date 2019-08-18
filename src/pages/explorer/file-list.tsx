import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { FileItem } from 'components';
import { File } from 'models';
import './file-list.css';

interface Props extends RouteComponentProps {
  files: File[]
}

interface State {
  
}

class FileListPage extends React.Component<Props, State> {
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
  
  onItemClicked = (file: File) => {
    this.props.history.push(`/explorer${file.path}`)
  }
}

export default withRouter(FileListPage);