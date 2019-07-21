import React from 'react';
import { List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

const Item = List.Item;

interface Props {
  form
}

interface State {
  
}

class BasicInput extends React.Component<Props, State> {
  state = {
    value: 1,
  }
  
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  }
  
  onRegister = () => {
    
  }
  
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four characters for account'));
    }
  }
  
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <form>
        <List
          renderHeader={() => 'Form Validation'}
          renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
        >
          <InputItem
            {...getFieldProps('account', {
              rules: [
                { required: true, message: 'Please input account' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="id"
          >
            아이디
          </InputItem>
          <InputItem
            {...getFieldProps('password')}
            placeholder="password"
            type="password"
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