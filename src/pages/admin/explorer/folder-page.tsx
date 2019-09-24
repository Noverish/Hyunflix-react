import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { PageHeader, Divider } from 'antd';

import { FileItem, RenameModal, EncodeModal } from 'components';
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
      <div>
        <PageHeader onBack={() => null} title="파일 탐색기" />
        <Divider style={{ margin: "0" }}/>
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
    // TODO make path relative
    this.props.history.push(`/admin/explorer${file.path}`)
  }
}

export default withRouter(FolderPage);