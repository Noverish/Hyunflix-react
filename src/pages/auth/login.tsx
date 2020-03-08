import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { loginAsync } from 'actions';
import { LoginParam } from 'models';
import './login.css';
const { Title } = Typography;

const USERNAME_FILED = 'username';
const PASSWORD_FIELD = 'password';

interface Props extends RouteComponentProps {
  loginAsyncRequest(param: LoginParam): ReturnType<typeof loginAsync.request>;
}

interface State {

}

class LoginPage extends React.Component<Props, State> {
  onFinish = (values) => {
    const username = values[USERNAME_FILED];
    const password = values[PASSWORD_FIELD];

    this.props.loginAsyncRequest({ username, password });
  }

  componentDidMount() {
    try {
      // @ts-ignore
      window.startVanta();
    } catch (_) {

    }
  }

  componentWillUnmount() {
    // @ts-ignore
    window.stopVanta();
  }

  render() {

    return (
      <div className="login-form-container">
        <Title>로그인</Title>
        <Form
          onFinish={this.onFinish}
          className="login-form"
        >
          <Form.Item
            name={USERNAME_FILED}
            rules={[{ required: true, message: '유저이름을 입력해주세요!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="유저이름"
            />
          </Form.Item>
          <Form.Item
            name={PASSWORD_FIELD}
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="비밀번호"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              로그인
            </Button>
          </Form.Item>
        </Form>
        <Link to="/register">회원가입 하기</Link>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginAsyncRequest: loginAsync.request,
};

export default connect(undefined, mapDispatchToProps)(LoginPage);
