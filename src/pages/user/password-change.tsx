import React, { RefObject } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { connect } from 'react-redux';

import { logoutAction } from 'src/actions';
import { changePassword } from 'src/api';
import { PageHeader } from 'src/components';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 4 },
};

const OLD_PASSWORD_FIELD = 'oldPassword';
const NEW_PASSWORD_FIELD = 'newPassword';
const NEW_PASSWORD_CONFIRM_FIELD = 'newPasswordConfirm';

interface Props {
  logout: typeof logoutAction;
}

interface State {
  loading: boolean;
}

class PasswordChangePage extends React.Component<Props, State> {
  formRef: RefObject<FormInstance> = React.createRef();

  state: State = {
    loading: false,
  };

  onFinish = (values) => {
    const oldPassword = values[OLD_PASSWORD_FIELD];
    const newPassword = values[NEW_PASSWORD_FIELD];

    this.setState({ loading: true });
    changePassword(oldPassword, newPassword)
      .then(() => {
        message.success('비밀번호 변경에 성공했습니다');
        this.props.logout();
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;

    return (
      <>
        <PageHeader title="비밀번호 변경" className="border-top border-bottom" style={{ marginBottom: '32px' }} />
        <Spin spinning={loading}>
          <Form className="border-bottom" layout="vertical" onFinish={this.onFinish}>
            <Form.Item
              label="기존 비밀번호"
              name={OLD_PASSWORD_FIELD}
              rules={[{ required: true, message: '기존 비밀번호를 입력해주세요' }]}
              {...formItemLayout}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              hasFeedback
              label="새로운 비밀번호"
              name={NEW_PASSWORD_FIELD}
              rules={[{ required: true, message: '새로운 비밀번호를 입력해주세요' }]}
              {...formItemLayout}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              hasFeedback
              label="새로운 비밀번호 확인"
              name={NEW_PASSWORD_CONFIRM_FIELD}
              dependencies={[NEW_PASSWORD_FIELD]}
              rules={[
                { required: true, message: '새로운 비밀번호를 입력해주세요' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue(NEW_PASSWORD_FIELD) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('위에서 입력하신 비밀번호와 다릅니다!'));
                  },
                }),
              ]}
              {...formItemLayout}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">확인</Button>
            </Form.Item>
          </Form>
        </Spin>
      </>
    );
  }
}

const mapDispatchToProps = {
  logout: logoutAction,
};

export default connect(undefined, mapDispatchToProps)(PasswordChangePage);
