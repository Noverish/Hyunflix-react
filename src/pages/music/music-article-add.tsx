import React from 'react';
import { PageHeader, Input, Button, Spin, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';

import { musicAdd } from 'api';
import { MainLayout } from 'components';
import './music-article-add.css';

interface Props extends RouteComponentProps, FormComponentProps {
  
}

interface State {
  
}

class MusicArticleAddPage extends React.Component<Props, State> {
  state = {
    
  }
  
  componentDidMount() {
    
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <MainLayout>
        <div className="article-list-page music-article-add">
          <div className="page-header">
            <PageHeader onBack={this.props.history.goBack} title="Music Add" subTitle="유튜브 링크로 음악 추가하기" />
          </div>
          <div className="page-content">
            <Form layout="inline">
              <Form.Item label="Youtube URL">
                {getFieldDecorator('url', { initialValue: '' })(<Input />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.onSubmit}>추가</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </MainLayout>
    )
  }
    
  onSubmit = () => {
    const url = this.props.form.getFieldValue('url');
    
    (async () => {
      await musicAdd(url);
      message.success('추가 완료');
      this.props.history.goBack();
    })().catch(console.error);
  }
}

export default Form.create()(MusicArticleAddPage);