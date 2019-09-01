import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Typography, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { login } from 'actions';
import './login.css';

const { Title } = Typography;

interface Props extends FormComponentProps, RouteComponentProps {
  onLogin;
}

interface State {
  
}

class NormalLoginForm extends React.Component<Props, State> {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err);
        return;
      }
    
      const username = values['username'];
      const password = values['password'];
      
      this.props.onLogin(username, password);
    });
  };
  
  onRegisterClicked = (e) => {
    e.preventDefault();
    this.props.history.push('/register');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form-container">
        <Title>로그인</Title>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '유저이름을 입력해주세요!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="유저이름"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '비밀번호를 입력해주세요!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="비밀번호"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>로그인 상태 유지</Checkbox>)}
            <a href="/" className="login-form-register" onClick={this.onRegisterClicked}>회원가입하기</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => dispatch(login(username, password)),
  }
}

const form = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default connect(undefined, mapDispatchToProps)(form);
