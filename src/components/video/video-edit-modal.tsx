import React from 'react';
import { Modal, Form, Input } from 'antd';

import { VideoArticle } from 'models';

interface Props {
  article: VideoArticle;
  visible: boolean;
  onClose: () => void;
}

interface State {
  
}

export default class VideoEditModal extends React.Component<Props, State> {
  state = {
    
  }
  
  renderFormItems = () => {
    const { article } = this.props;
    
    return Object.keys(article).map(k => (
      <Form.Item label={k} key={k} style={{ marginBottom: '0' }}>
        <Input defaultValue={article[k]}/>
      </Form.Item>
    ))
  }
  
  render() {
    
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    
    return (
      <Modal
        title="Title"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form layout="horizontal" {...formItemLayout}>
          { this.renderFormItems() }
        </Form>
      </Modal>
    )
  }
  
  onOk = () => {
    this.props.onClose();
  }
  
  onCancel = () => {
    this.props.onClose();
  }
}