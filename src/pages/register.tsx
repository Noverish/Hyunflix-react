import React from 'react';
import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Redirect } from 'react-router-dom';

import { api, auth } from 'utils';

const Item = List.Item;

interface Props {
  form
}

interface State {
  
}

class BasicInput extends React.Component<Props, State> {
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        
        const values = this.props.form.getFieldsValue();
        const id = values['id'];
        const password = values['password'];
        const password2 = values['password2'];
        const register_code = values['register_code'];
      
        if(password === password2) {
          api.register(id, password, register_code)
            .then((token) => {
              auth.setToken(token);
              this.forceUpdate();
            })
            .catch((err) => {
              alert(err.response.data['msg']);
            })
        } else {
          alert('비밀번호를 다르게 입력하셨습니다');
        }
      } else {
        alert('입력하신 내용에 오류가 있습니다');
      }
    });
  }

  validateID = (rule, value, callback) => {
    if (!value || value === '') {
      callback(new Error('아이디를 입력해주세요'))
    } else if (value.length < 4) {
      callback(new Error('아이디는 4자리 이상이어야 합니다'));
    } else if ((/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/).test(value)) {
      callback(new Error('아이디에 한글을 넣을 수 없습니다'));
    } else {
      callback();
    }
  }
  
  password = ''
  
  validatePassword = (rule, value, callback) => {
    this.password = value;
    if (!value || value === '') {
      callback(new Error('비밀번호를 입력해주세요'));
    } else if (value.length < 4) {
      callback(new Error('비밀번호는 4자리 이상이어야 합니다'));
    } else if ((/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/).test(value)) {
      callback(new Error('비밀번호에 한글을 넣을 수 없습니다'));
    } else {
      callback();
    }
  }
  
  validatePassword2 = (rule, value, callback) => {
    if (value !== this.password) {
      callback(new Error('비밀번호가 다릅니다'));
    } else {
      callback();
    }
  }
  
  validateRegisterCode = (rule, value, callback) => {
    if (!value || value === '') {
      callback(new Error('가입 코드를 입력해주세요'))
    } else {
      callback();
    }
  }

  render() {
    if (auth.getToken()) {
      return <Redirect to="/"/>
    }
    
    const { getFieldProps, getFieldError } = this.props.form;

    const idRule = [ { validator: this.validateID } ]
    const pwRule = [ { validator: this.validatePassword } ]
    const pwRule2 = [ { validator: this.validatePassword2 } ]
    const codeRule = [ { validator: this.validateRegisterCode } ]

    return (
      <form>
        <List
          renderHeader={() => '회원가입'}
          renderFooter={() => {
            let msg = ''
            msg += (getFieldError('id')) ? `${getFieldError('id')}. ` : '';
            msg += (getFieldError('password')) ? `${getFieldError('password')}. ` : '';
            msg += (getFieldError('password2')) ? `${getFieldError('password2')}. ` : '';
            msg += (getFieldError('register_code')) ? `${getFieldError('register_code')}. ` : '';
            return msg
          }}
        >
          <InputItem
            labelNumber={7}
            {...getFieldProps('id', { rules: idRule })}
            error={getFieldError('id')}
            onErrorClick={() => { this.forceUpdate() }}
            placeholder="아이디"
          >
            아이디
          </InputItem>
          <InputItem
            labelNumber={7}
            {...getFieldProps('password', { rules: pwRule })}
            error={getFieldError('password')}
            onErrorClick={() => { this.forceUpdate() }}
            placeholder="비밀번호"
            type="password"
          >
            비밀번호
          </InputItem>
          <InputItem
            labelNumber={7}
            {...getFieldProps('password2', { rules: pwRule2 })}
            error={getFieldError('password2')}
            onErrorClick={() => { this.forceUpdate() }}
            placeholder="비밀번호 확인"
            type="password"
          >
            비밀번호 확인
          </InputItem>
          <InputItem
            labelNumber={7}
            {...getFieldProps('register_code', { rules: codeRule })}
            error={getFieldError('register_code')}
            onErrorClick={() => { this.forceUpdate() }}
            placeholder="회원가입 코드"
          >
            회원가입 코드
          </InputItem>
          <Item>
            <Button type="primary" size="small" inline onClick={this.onSubmit}>회원가입</Button>
          </Item>
        </List>
      </form>
    );
  }
}

const BasicInputWrapper = createForm()(BasicInput);

export default BasicInputWrapper; 