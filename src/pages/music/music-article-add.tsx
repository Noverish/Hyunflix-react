import React from 'react';
import { PageHeader, Input, Button, Spin, Form, message, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { musicTagListAsync } from 'actions';
import { musicAdd } from 'api';
import { MainLayout } from 'components';
import './music-article-add.css';

const { Option } = Select;

interface Props extends RouteComponentProps, FormComponentProps {
  musicTagListAsync(): ReturnType<typeof musicTagListAsync.request>
  tags: string[];
}

interface State {
  
}

class MusicArticleAddPage extends React.Component<Props, State> {
  state = {
    
  }
  
  componentDidMount() {
    this.props.musicTagListAsync();
  }
  
  render() {
    const { tags } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    const options = tags.map(t => <Option key={t}>{t}</Option>);
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    
    return (
      <MainLayout>
        <div className="article-list-page music-article-add">
          <div className="page-header">
            <PageHeader onBack={this.props.history.goBack} title="Music Add" subTitle="유튜브 링크로 음악 추가하기" />
          </div>
          <div className="page-content">
            <Form {...formItemLayout}>
              <Form.Item label="Youtube URL">
                {getFieldDecorator('url', {
                  rules: [ { required: true, message: 'Youtube 링크를 입력해주세요!' } ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Tags">
                {getFieldDecorator('tags')(
                  <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
                    {options}
                  </Select>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" onClick={this.onSubmit}>추가</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </MainLayout>
    )
  }
    
  onSubmit = () => {
    const url: string = this.props.form.getFieldValue('url');
    const tags: string[] = this.props.form.getFieldValue('tags');
    
    (async () => {
      await musicAdd(url, tags);
      message.success('추가 완료');
      // this.props.history.goBack();
    })().catch(console.error);
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.music.tags,
  }
}

const mapDispatchToProps = {
  musicTagListAsync: musicTagListAsync.request
}

const form = Form.create()(MusicArticleAddPage)
export default connect(mapStateToProps, mapDispatchToProps)(form);