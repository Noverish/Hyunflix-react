import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'react-redux';

import { registerAsync } from 'actions';
import { RegisterParam } from 'models';
import './register.css';

const { Title } = Typography;

interface Props extends FormComponentProps {
  registerAsyncRequest(param: RegisterParam): ReturnType<typeof registerAsync.request>;
}

interface State {
  password2Dirty: boolean;
}

class RegistrationForm extends React.Component<Props, State> {
  state = {
    password2Dirty: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (err) {
        // console.log(err);
        // alert('입력하신 내용에 오류가 있습니다');
        return;
      }

      const username = values['username'];
      const password = values['password1'];
      const regCode = values['reg_code'];

      this.props.registerAsyncRequest({ username, password, regCode });
    });
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ password2Dirty: this.state.password2Dirty || !!value });
  }

  validateID = (rule, value, callback) => {
    if (value) {
      if (value.length < 4) {
        callback(new Error('아이디는 4자리 이상이어야 합니다'));
      } else if ((/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/).test(value)) {
        callback(new Error('아이디에 한글을 넣을 수 없습니다'));
      }
    }
    callback();
  }

  validatePassword1 = (rule, value, callback) => {
    if (value) {
      if (this.state.password2Dirty) {
        this.props.form.validateFields(['password2'], (err, values) => {});
      }

      if (value.length < 4) {
        callback(new Error('비밀번호는 4자리 이상이어야 합니다'));
      } else if ((/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/).test(value)) {
        callback(new Error('비밀번호에 한글을 넣을 수 없습니다'));
      }
    }
    callback();
  }

  validatePassword2 = (rule, value, callback) => {
    const password1 = this.props.form.getFieldValue('password1');
    if (value && value !== password1) {
      callback(new Error('위에서 입력하신 비밀번호와 다릅니다!'));
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="register-form-container">
        <Title>회원가입</Title>
        <Form onSubmit={this.onSubmit} className="register-form">
          <Form.Item label="유저이름">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '유저이름을 입력해주세요!',
                },
                {
                  validator: this.validateID,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="비밀번호" hasFeedback={true}>
            {getFieldDecorator('password1', {
              rules: [
                {
                  required: true,
                  message: '비밀번호를 입력해주세요!',
                },
                {
                  validator: this.validatePassword1,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="비밀번호 확인" hasFeedback={true}>
            {getFieldDecorator('password2', {
              rules: [
                {
                  required: true,
                  message: '위에서 입력하신 비밀번호를 다시 입력해주세요!',
                },
                {
                  validator: this.validatePassword2,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                가입코드&nbsp;
                <Tooltip title="회원가입때 쓰라고 준 코드입니다">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('reg_code', {
              rules: [{ required: true, message: '회원가입 코드를 입력해주세요!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item>
            <Button className="register-form-button" type="primary" htmlType="submit">
              Register
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

const form =  Form.create({ name: 'register' })(RegistrationForm);
export default connect(undefined, mapDispatchToProps)(form);
