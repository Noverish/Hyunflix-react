import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'react-redux';

import { registerAsync } from 'actions';
import { RegisterParam } from 'models';
import './register.css';
const { Title } = Typography;

const USERNAME_FIELD = 'username';
const PASSWORD1_FIELD = 'password1';
const PASSWORD2_FIELD = 'password2';
const REGCODE_FIELD = 'regCode';

interface Props extends FormComponentProps {
  registerAsyncRequest(param: RegisterParam): ReturnType<typeof registerAsync.request>;
}

interface State {
  password2Dirty: boolean;
}

class RegisterPage extends React.Component<Props, State> {
  state = {
    password2Dirty: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const username = values[USERNAME_FIELD];
        const password = values[PASSWORD1_FIELD];
        const regCode = values[REGCODE_FIELD];
  
        this.props.registerAsyncRequest({ username, password, regCode });
      }
    });
  }

  onPassword2Blur = (e) => {
    const { value } = e.target;
    this.setState({ password2Dirty: this.state.password2Dirty || !!value });
  }

  validatePassword1 = (_, value, callback) => {
    if (value && this.state.password2Dirty) {
      this.props.form.validateFields([PASSWORD2_FIELD], () => {});
    }
    callback();
  }

  validatePassword2 = (_, value, callback) => {
    const password1 = this.props.form.getFieldValue(PASSWORD1_FIELD);
    if (value && value !== password1) {
      callback(new Error('위에서 입력하신 비밀번호와 다릅니다!'));
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
    const usernameField = getFieldDecorator(USERNAME_FIELD, {
      rules: [{ required: true, message: '유저이름을 입력해주세요!' }],
    })(<Input />)
    
    const passwordField1 = getFieldDecorator(PASSWORD1_FIELD, {
      rules: [
        { required: true, message: '비밀번호를 입력해주세요!' },
        { validator: this.validatePassword1 },
      ],
    })(<Input.Password />)
    
    const passwordField2 = getFieldDecorator(PASSWORD2_FIELD, {
      rules: [
        { required: true, message: '위에서 입력하신 비밀번호를 다시 입력해주세요!' },
        { validator: this.validatePassword2 },
      ],
    })(<Input.Password onBlur={this.onPassword2Blur} />);
    
    const regCodeField = getFieldDecorator(REGCODE_FIELD, {
      rules: [{ required: true, message: '회원가입 코드를 입력해주세요!' }],
    })(<Input />)
    
    return (
      <div className="register-form-container">
        <Title>회원가입</Title>
        <Form onSubmit={this.onSubmit} className="register-form">
          <Form.Item label="유저이름">
            {usernameField}
          </Form.Item>
          <Form.Item label="비밀번호">
            {passwordField1}
          </Form.Item>
          <Form.Item label="비밀번호 확인">
            {passwordField2}
          </Form.Item>
          <Form.Item label="가입코드">
            {regCodeField}
          </Form.Item>
          <Form.Item>
            <Button className="register-form-button" type="primary" htmlType="submit">
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

const form =  Form.create()(RegisterPage);
export default connect(undefined, mapDispatchToProps)(form);
