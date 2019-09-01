import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { FileItem, RenameModal, EncodeModal, MainLayout } from 'components';
import { File } from 'models';
import './folder-page.css';

interface Props extends RouteComponentProps {
  files: File[]
}

interface State {
  renameModalFile: File | null;
  encodeModalFile: File | null;
}

class FolderPage extends React.Component<Props, State> {
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
      <MainLayout>
        <div>
          {fileItems}
          {renameModal}
          {encodeModal}
        </div>
      </MainLayout>
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

export default withRouter(FolderPage);