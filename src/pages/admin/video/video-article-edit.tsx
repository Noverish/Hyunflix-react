import React from 'react';
import { Input, Button, Form, Checkbox, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { VideoArticle } from 'models';
import { videoArticleUpdate } from 'api';

interface Props extends RouteComponentProps, FormComponentProps {

}

interface State {

}

// TODO 리팩토링 필요
class VideoArticleEditPage extends React.Component<Props, State> {
  process = () => {
    // TODO this.props.location.state가 VideoArticle[]이 아닐경우

    const articles: VideoArticle[] = this.props.location.state;

    const from: string = this.props.form.getFieldValue('from');
    const to: string = this.props.form.getFieldValue('to');
    const isRegex: boolean = this.props.form.getFieldValue('isRegex');

    return articles.map(article => ({
      origin: article.title,
      update: (isRegex)
        ? article.title.replace(new RegExp(from), to)
        : article.title.split(from).join(to),
      key: article.id,
    }));
  }

  renderTable = () => {
    const dataSource = this.process();

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
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 4 },
    };

    return (
      <div className="video-article-edit-page">
        <Form>
          <Form.Item label="From" {...formItemLayout}>
            {getFieldDecorator('from', { initialValue: '' })(<Input />)}
          </Form.Item>
          <Form.Item label="To" {...formItemLayout}>
            {getFieldDecorator('to', { initialValue: '' })(<Input />)}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            {getFieldDecorator('isRegex', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>is Regex</Checkbox>)}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" onClick={this.onSubmit}>Run</Button>
          </Form.Item>
        </Form>
        {this.renderTable()}
      </div>
    );
  }

  onSubmit = () => {
    const dataSource = this.process();

    (async () => {
      for (let i = 0; i < dataSource.length; i += 1) {
        await videoArticleUpdate({
          videoArticleId: dataSource[i].key,
          params: {
            title: dataSource[i].update,
          },
        });
      }

      this.props.history.push('/admin/video/manage');
    })().catch(console.error);
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const form = Form.create()(VideoArticleEditPage);
export default connect(mapStateToProps, mapDispatchToProps)(form);
