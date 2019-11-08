import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { loginAsync } from 'actions';
import { LoginParam } from 'models';
import './login.css';
const { Title } = Typography;

const USERNAME_FILED = 'username';
const PASSWORD_FIELD = 'password';

interface Props extends FormComponentProps, RouteComponentProps {
  loginAsyncRequest(param: LoginParam): ReturnType<typeof loginAsync.request>;
}

interface State {

}

class LoginPage extends React.Component<Props, State> {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const username = values[USERNAME_FILED];
        const password = values[PASSWORD_FIELD];
  
        this.props.loginAsyncRequest({ username, password });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
    const usernameField = getFieldDecorator(USERNAME_FILED, {
      rules: [{ required: true, message: '유저이름을 입력해주세요!' }],
    })(
      <Input
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="유저이름"
      />,
    );
    
    const passwordField = getFieldDecorator(PASSWORD_FIELD, {
      rules: [{ required: true, message: '비밀번호를 입력해주세요!' }],
    })(
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="비밀번호"
      />,
    )
    
    return (
      <div className="login-form-container">
        <Title>로그인</Title>
        <Form onSubmit={this.onSubmit} className="login-form">
          <Form.Item>
            {usernameField}
          </Form.Item>
          <Form.Item>
            {passwordField}
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

const form = Form.create()(LoginPage);
export default connect(undefined, mapDispatchToProps)(form);
