import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, Typography, Checkbox, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { FileSelectModal } from 'components';
import { File } from 'models';
import { VideoUpdateParams, VideoUpdateResult, videoUpdate } from 'api';
import './video-manage.css';

interface Props extends RouteComponentProps, FormComponentProps {
  
}

interface State {
  folderModalVisible: boolean;
  result: VideoUpdateResult | null;
}

class VideoManagePage extends React.Component<Props, State> {
  state = {
    folderModalVisible: false,
    result: null,
  }
  
  renderTable() {
    if (!this.state.result) {
      return null;
    }
    
    const result: VideoUpdateResult = this.state.result!;
    
    const dataSource = result.origins.map((_, i) => ({
      origin: result.origins[i],
      update: result.updates[i],
    }))
    
    const columns = [
      {
        title: 'origin',
        dataIndex: 'origin',
        key: 'origin',
      },
      {
        title: 'update',
        dataIndex: 'update',
        key: 'update',
      },
    ];
    
    return <Table dataSource={dataSource} columns={columns} />;
  }
  
  render() {
    const { folderModalVisible } = this.state;
    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 4 },
    }
    
    return (
      <div className="video-manage-page">
        <Typography.Title>비디오 제목 일괄 수정</Typography.Title>
        <Form>
          <Form.Item label="From" {...formItemLayout}>
            {getFieldDecorator('from')(<Input />)}
          </Form.Item>
          <Form.Item label="To" {...formItemLayout}>
            {getFieldDecorator('to', { initialValue: '' })(<Input />)}
          </Form.Item>
          <Form.Item label="Path" {...formItemLayout}>
            <div style={{ display: 'flex' }}>
              {getFieldDecorator('path')(<Input />)}
              <Button onClick={this.folderSelectClicked}>폴더 선택</Button>
            </div>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            {getFieldDecorator('isRegex', {
              valuePropName: 'checked',
              initialValue: false
            })(<Checkbox>is Regex</Checkbox>)}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button className="margin-right-8" onClick={this.onSubmit(true)}>Dry Run</Button>
            <Button className="margin-right-8" type="primary" onClick={this.onSubmit(false)}>Run</Button>
          </Form.Item>
        </Form>
        { this.renderTable() }
        <FileSelectModal visible={folderModalVisible} onClose={this.folderSelected}/>
      </div>
    )
  }
  
  folderSelectClicked = () => {
    this.setState({ folderModalVisible: true });
  }
  
  folderSelected = (file: File | null) => {
    this.setState({ folderModalVisible: false });
    this.props.form.setFields({
      path: { value: file ? file.path : '' },
    });
  }
  
  onSubmit = (isDryrun: boolean) => () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err);
        return;
      }
      
      const params: VideoUpdateParams = {
        isDryrun,
        from: values.from,
        to: values.to,
        isRegex: values.isRegex,
        path: values.path,
      }
      
      videoUpdate(params)
        .then((result: VideoUpdateResult) => {
          this.setState({ result })
        })
    });
  }
}

const mapDispatchToProps = {
  
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const form = Form.create()(VideoManagePage);
export default connect(mapStateToProps, mapDispatchToProps)(form);
