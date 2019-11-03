import React from 'react';
import { PageHeader, Input, Button, Form, message, Select, Steps, Progress } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import * as socketio from 'socket.io-client';

import { YoutubeStage } from 'models';
import { SOCKET_SERVER, YOUTUBE_SOCKET_PATH } from 'config';
import { musicTagListAsync } from 'actions';
import { musicAdd } from 'api';

const { Option } = Select;
const { Step } = Steps;

interface Props extends RouteComponentProps, FormComponentProps {
  musicTagListAsync(): ReturnType<typeof musicTagListAsync.request>;
  tags: Map<string, string>;
}

interface State {
  stage: number;
  progress: number;
  eta: number;
}

class MusicAddPage extends React.Component<Props, State> {
  socket: socketio.Socket | null = null;

  state = {
    stage: -1,
    progress: 0,
    eta: 0,
  };

  componentDidMount() {
    this.props.musicTagListAsync();
  }

  renderSteps = (stepStage: number) => {
    const { stage, progress, eta } = this.state;

    let percent = 0;
    if (stage < stepStage) {
      percent = 0;
    } else if (stage === stepStage) {
      percent = progress;
    } else {
      percent = 100;
    }

    let subTitle = '';
    if (stage < stepStage) {
      subTitle = '준비중';
    } else if (stage === stepStage) {
      subTitle = `${eta}초 남음`;
    } else {
      subTitle = '완료';
    }

    switch (stepStage) {
      case YoutubeStage.ready: {
        return <Step title="준비" subTitle={subTitle} />;
      }
      case YoutubeStage.download: {
        return <Step title="다운로드" subTitle={subTitle} description={<Progress percent={percent} />} />;
      }
      case YoutubeStage.encode: {
        return <Step title="인코딩" subTitle={subTitle} description={<Progress percent={percent} />} />;
      }
    }
  }

  render() {
    const { stage } = this.state;
    const { tags } = this.props;
    const { getFieldDecorator } = this.props.form;

    const options = Array.from(tags.keys()).map(t => <Option key={t}>{t}</Option>);

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
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader onBack={this.props.history.goBack} title="Music Add" subTitle="유튜브 링크로 음악 추가하기" />
        </div>
        <div className="page-content">
          <Form {...formItemLayout} style={{ margin: '8px 0' }}>
            <Form.Item label="Youtube URL">
              {getFieldDecorator('url', {
                rules: [{ required: true, message: 'Youtube 링크를 입력해주세요!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Tags">
              {getFieldDecorator('tags')(
                <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
                  {options}
                </Select>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" onClick={this.onSubmit}>추가</Button>
            </Form.Item>
          </Form>
          <Steps direction="vertical" current={stage}>
            {this.renderSteps(YoutubeStage.ready)}
            {this.renderSteps(YoutubeStage.download)}
            {this.renderSteps(YoutubeStage.encode)}
          </Steps>
        </div>
      </div>
    );
  }

  onSubmit = () => {
    const url: string = this.props.form.getFieldValue('url');
    const tags: string[] = this.props.form.getFieldValue('tags');

    (async () => {
      this.socket = socketio.connect(SOCKET_SERVER, { path: YOUTUBE_SOCKET_PATH });
      this.socket.on('message', (data: Buffer) => {
        const payload = JSON.parse(data.toString());
        this.setState(payload);

        if (payload.stage === YoutubeStage.success) {
          this.socket.disconnect();
          message.success('추가 완료');
        }
      });

      await musicAdd(url, tags);
    })().catch(console.error);
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.music.tags,
  };
};

const mapDispatchToProps = {
  musicTagListAsync: musicTagListAsync.request,
};

const form = Form.create()(MusicAddPage);
export default connect(mapStateToProps, mapDispatchToProps)(form);
