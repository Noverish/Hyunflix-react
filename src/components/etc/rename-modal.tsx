import React from 'react';
import { Modal, Input, message } from 'antd';

import { rename } from 'api';
import './rename-modal.css';

interface Props {
  path: string;
  visible: boolean;
  onClose: () => void;
}

interface State {
  confirmLoading: boolean;
}

export default class RenameModal extends React.Component<Props, State> {
  input: Input | null = null;

  state = {
    confirmLoading: false,
  };

  render() {
    return (
      <Modal
        title="이름 변경"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        confirmLoading={this.state.confirmLoading}
      >
        <Input ref={ref => this.input = ref} defaultValue={this.props.path} />
      </Modal>
    );
  }

  onOk = () => {
    this.setState({ confirmLoading: true });
    const fromPath = this.props.path;
    const toPath = this.input!.state.value;

    rename(fromPath, toPath)
      .then(() => {
        this.props.onClose();
        message.success('이름 변경에 성공했습니다');
      })
      .catch((msg) => {
        this.props.onClose();
      });
  }

  onCancel = () => {
    this.props.onClose();
  }
}
