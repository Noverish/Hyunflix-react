import React, { RefObject } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { connect } from 'react-redux';

import { registerAsync } from 'actions';
import { RegisterParam } from 'models';
import './register.css';
const { Title } = Typography;

const USERNAME_FIELD = 'username';
const PASSWORD1_FIELD = 'password1';
const PASSWORD2_FIELD = 'password2';
const REGCODE_FIELD = 'regCode';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  registerAsyncRequest(param: RegisterParam): ReturnType<typeof registerAsync.request>;
}

class RegisterPage extends React.Component<Props> {
  formRef: RefObject<FormInstance> = React.createRef();

  onFinish = (values) => {
    const username = values[USERNAME_FIELD];
    const password = values[PASSWORD1_FIELD];
    const regCode = values[REGCODE_FIELD];

    this.props.registerAsyncRequest({ username, password, regCode });
  }

  render() {
    return (
      <div className="register-form-container">
        <Title>회원가입</Title>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          className="register-form"
          {...layout}
        >
          <Form.Item
            label="유저이름"
            name={USERNAME_FIELD}
            rules={[{ required: true, message: '유저이름을 입력해주세요!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback={true}
            label="비밀번호"
            name={PASSWORD1_FIELD}
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback={true}
            label="비밀번호 확인"
            name={PASSWORD2_FIELD}
            dependencies={[PASSWORD1_FIELD]}
            rules={[
              { required: true, message: '위에서 입력하신 비밀번호를 다시 입력해주세요!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue(PASSWORD1_FIELD) === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('위에서 입력하신 비밀번호와 다릅니다!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="가입코드"
            name={REGCODE_FIELD}
            rules={[{ required: true, message: '회원가입 코드를 입력해주세요!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  registerAsyncRequest: registerAsync.request,
};

export default connect(undefined, mapDispatchToProps)(RegisterPage);
