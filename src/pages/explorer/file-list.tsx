import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import { FileItem, RenameModal, EncodeModal } from 'components';
import { File } from 'models';
import './file-list.css';

interface Props extends RouteComponentProps {
  files: File[]
}

interface State {
  renameModalFile: File | null;
  encodeModalFile: File | null;
}

class FileListPage extends React.Component<Props, State> {
  state = {
    renameModalFile: null,
    encodeModalFile: null,
  }
  
  render() {
    const fileItems = this.props.files.map((file, index) => 
      <FileItem
        key={index}
        file={file}
        onClick={this.onItemClicked}
        onRenameClick={this.onRenameClick}
        onEncodeClick={this.onEncodeClick}
      />
    )
    
    const renameModalFile: File | null = this.state.renameModalFile;
    const renameModal = (renameModalFile)
      ? <RenameModal
          path={renameModalFile!.path}
          visible={true}
          onClose={this.onRenameModalClose}
        />
      : null
    
    const encodeModalFile: File | null = this.state.encodeModalFile;
    const encodeModal = (encodeModalFile)
      ? <EncodeModal
          path={encodeModalFile!.path}
          visible={true}
          onClose={this.onEncodeModalClose}
        />
      : null
    
    return (
      <div>
        {fileItems}
        {renameModal}
        {encodeModal}
      </div>
    )
  }
  
  onRenameClick = (file: File) => {
    this.setState({ renameModalFile: file });
  }
  
  onEncodeClick = (file: File) => {
    this.setState({ encodeModalFile: file });
  }
  
  onRenameModalClose = () => {
    this.setState({ renameModalFile: null });
  }
  
  onEncodeModalClose = () => {
    this.setState({ encodeModalFile: null });
  }
  
  onItemClicked = (file: File) => {
    this.props.history.push(`/explorer${file.path}`)
  }
}

let mapStateToProps = (state) => {
  return {
    files: state.explorer.files
  };
}

export default connect(mapStateToProps)(withRouter(FileListPage));