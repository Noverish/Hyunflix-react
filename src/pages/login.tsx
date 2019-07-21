import React from 'react';
import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Redirect } from 'react-router-dom';

import { api, auth } from 'utils'

const Item = List.Item;

interface Props {
  form
}

interface State {
  register: boolean
}

class BasicInput extends React.Component<Props, State> {
  state = {
    register: false
  }
  
  onSubmit = () => {
    const values = this.props.form.getFieldsValue();
    const id = values['id'];
    const password = values['password'];
    
    api.login(id, password)
      .then((token) => {
        auth.setToken(token);
        this.forceUpdate();
      })
      .catch((err) => {
        alert(err.response.data['msg']);
      })
  }
  
  onRegister = () => {
    this.setState({
      register: true
    })
  }
  
  render() {
    if (auth.getToken()) {
      return <Redirect to="/"/>
    }
    
    if (this.state.register) {
      return <Redirect to="/register"/>
    }
    
    const { getFieldProps } = this.props.form;

    return (
      <form>
        <List
          renderHeader={() => '로그인'}
        >
          <InputItem
            {...getFieldProps('id')}
            placeholder="아이디"
          >
            아이디
          </InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="비밀번호"
          >
            비밀번호
          </InputItem>
          <Item>
            <Button type="primary" size="small" inline onClick={this.onSubmit}>로그인</Button>
            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onRegister}>회원가입</Button>
          </Item>
        </List>
      </form>
    );
  }
}

const BasicInputWrapper = createForm()(BasicInput);

export default BasicInputWrapper;