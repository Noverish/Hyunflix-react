import React from 'react';
import { Modal, Input, message } from 'antd';
import { rename } from 'api';
import './rename-modal.css';

interface Props {
  value: string;
  visible: boolean;
  closeCallback: () => void;
  successCallback: (fromPath: string, toPath: string) => void;
}

interface State {
  confirmLoading: boolean;
}

export default class RenameModal extends React.Component<Props, State> {
  input: Input | null = null;
  
  state = {
    confirmLoading: false
  }
  
  handleOk = () => {
    this.setState({ confirmLoading: true });
    const fromPath = this.props.value;
    const toPath = this.input!.state.value;
    
    rename(fromPath, toPath)
      .then(() => {
        this.close();
        this.props.successCallback(fromPath, toPath);
        message.success('이름 변경에 성공했습니다');
      })
      .catch((msg) => {
        this.close();
        alert(msg);
      })
  }
  
  handleCancel = () => {
    this.close();
  }
  
  close = () => {
    this.props.closeCallback();
    this.setState({
      confirmLoading: false,
    });
  }
  
  render() {
    return (
      <Modal
        title="이름 변경"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.confirmLoading}
      >
        <Input ref={ref => { this.input = ref; }} defaultValue={this.props.value} />
      </Modal>
    )
  }
}