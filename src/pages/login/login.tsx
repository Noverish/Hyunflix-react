import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Redirect } from 'react-router-dom';

import { login } from 'api';
import * as auth from 'utils/auth';
import './login.css';

const { Title } = Typography;

interface Props extends FormComponentProps, RouteComponentProps {
  
}

interface State {
  
}

class NormalLoginForm extends React.Component<Props, State> {
  state = {
    goToRegister: false
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        alert(err);
        return;
      }
    
      const username = values['username'];
      const password = values['password'];
      
      login(username, password)
        .then((token) => {
          auth.setToken(token);
          this.forceUpdate();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response);
        })
    });
  };
  
  onRegisterClicked = (e) => {
    e.preventDefault();
    this.props.history.push('/register');
  }

  render() {
    if (auth.getToken()) {
      return <Redirect to="/"/>
    }

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

export default Form.create({ name: 'normal_login' })(NormalLoginForm);;

// import { List, InputItem, Button } from 'antd-mobile';
// import { createForm } from 'rc-form';

// import { api, auth } from 'utils'

// const Item = List.Item;

// interface Props {
//   form
// }

// interface State {
//   register: boolean
// }

// class BasicInput extends React.Component<Props, State> {
//   state = {
//     register: false
//   }
  
//   onSubmit = () => {
//   }
  
  
//   render() {
    
    
//     const { getFieldProps } = this.props.form;

//     return (
//       <form>
//         <List
//           renderHeader={() => '로그인'}
//         >
//           <InputItem
//             {...getFieldProps('id')}
//             placeholder="아이디"
//           >
//             아이디
//           </InputItem>
//           <InputItem
//             {...getFieldProps('password')}
//             type="password"
//             placeholder="비밀번호"
//           >
//             비밀번호
//           </InputItem>
//           <Item>
//             <Button type="primary" size="small" inline onClick={this.onSubmit}>로그인</Button>
//             <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onRegister}>회원가입</Button>
//           </Item>
//         </List>
//       </form>
//     );
//   }
// }

// const BasicInputWrapper = createForm()(BasicInput);

// export default BasicInputWrapper;
