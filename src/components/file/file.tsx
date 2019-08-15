import React from 'react';
import { Button, Modal } from 'antd';
import { extname } from 'path';

import { File } from 'models';
import { encodeFile } from 'api';
import './file.css';

interface Props {
  file: File
  callback: (File) => void
}

interface State {
  encodeModalVisible: boolean
}

class Fileitem extends React.Component<Props, State> {
  state = {
    encodeModalVisible: false
  }
  
  onClick = (e) => {
    e.preventDefault();
    this.props.callback(this.props.file)
  }
  
  showModal = (e) => {
    this.setState({
      encodeModalVisible: true
    })
  }
  
  handleOk = e => {
    encodeFile(this.props.file.path);
    this.setState({
      encodeModalVisible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      encodeModalVisible: false,
    });
  };
  
  render () {
    const isVideo = ['.mp4', '.avi', '.mkv'].includes(extname(this.props.file.name));
    
    return (
      <div className="file-item">
        <div className="file-item-title">
          <a className="file-item-name" href={this.props.file.path} onClick={this.onClick}><span>{this.props.file.name}</span></a>
          <div className="file-item-size">{this.props.file.size}</div>
        </div>
        <Button className="file-item-button">rename</Button>
        <Button className="file-item-button">remove</Button>
        <Button className="file-item-button" onClick={this.showModal} disabled={!isVideo}>encode</Button>
        <Modal
            title="비디오 인코딩"
            visible={this.state.encodeModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            인코딩 하시겠습니까?
          </Modal>
      </div>
    )
  }
}

export default Fileitem;