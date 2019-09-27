import React from 'react';
import { Modal, Input, Button } from 'antd';

import { File } from 'models';
import { FileSelectModal } from 'components';

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface State {
  fileModalVisible: boolean;
}

class VideoEditModal extends React.Component<Props, State> {
  state = {
    fileModalVisible: false,
  }
  
  render() {
    const { visible, onClose } = this.props;
    const { fileModalVisible } = this.state;
    
    return (
      <Modal
        title="Title"
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <Input style={{ width: '50%' }} placeholder="replace from (regex)" />
        <Input style={{ width: '50%' }} placeholder="replace to" />
        <Button onClick={() => this.setState({ fileModalVisible: true })}>파일 선택</Button>
        <FileSelectModal visible={fileModalVisible} onClose={this.onClose} />
      </Modal>
    )
  }
  
  onClose = (file: File | null) => {
    this.setState({ fileModalVisible: false });
  }
}

export default VideoEditModal;

