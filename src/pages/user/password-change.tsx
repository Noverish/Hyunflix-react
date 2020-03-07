import React from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'react-redux';

import { logoutAction } from 'actions';
import { changePassword } from 'api';
import { PageHeader } from 'components';

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

interface Props extends FormComponentProps {
  logout: typeof logoutAction;
}

interface State {
  confirmDirty: boolean;
  loading: boolean;
}

class PasswordChangePage extends React.Component<Props, State> {
  state: State = {
    confirmDirty: false,
    loading: false,
  };

  handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (_, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields([NEW_PASSWORD_CONFIRM_FIELD], { force: true });
    }
    callback();
  }

  compareToFirstPassword = (_, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue(NEW_PASSWORD_FIELD)) {
      callback('위에서 입력하신 비밀번호와 다릅니다!');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    const oldPasswordField = getFieldDecorator(OLD_PASSWORD_FIELD, {
      rules: [
        {
          required: true,
          message: '기존 비밀번호를 입력해주세요',
        },
      ],
    })(<Input.Password />);

    const newPasswordField = getFieldDecorator(NEW_PASSWORD_FIELD, {
      rules: [
        {
          required: true,
          message: '새로운 비밀번호를 입력해주세요',
        },
        {
          validator: this.validateToNextPassword,
        },
      ],
    })(<Input.Password  />);

    const newPasswordField2 = getFieldDecorator(NEW_PASSWORD_CONFIRM_FIELD, {
      rules: [
        {
          required: true,
          message: '새로운 비밀번호를 입력해주세요',
        },
        {
          validator: this.compareToFirstPassword,
        },
      ],
    })(<Input.Password  onBlur={this.handleConfirmBlur} />);

    return (
      <React.Fragment>
        <PageHeader title="비밀번호 변경" className="border-top border-bottom" style={{ marginBottom: '32px' }} />
        <Spin spinning={loading}>
          <Form className="border-bottom" layout="vertical" onSubmit={this.onSubmit}>
            <Form.Item label="기존 비밀번호" {...formItemLayout}>
              {oldPasswordField}
            </Form.Item>
            <Form.Item label="새로운 비밀번호" {...formItemLayout}>
              {newPasswordField}
            </Form.Item>
            <Form.Item label="새로운 비밀번호 확인" {...formItemLayout}>
              {newPasswordField2}
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">확인</Button>
            </Form.Item>
          </Form>
        </Spin>
      </React.Fragment>
    );
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
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
      }
    });
  }
}

const mapDispatchToProps = {
  logout: logoutAction,
};

export default connect(undefined, mapDispatchToProps)(Form.create()(PasswordChangePage));
