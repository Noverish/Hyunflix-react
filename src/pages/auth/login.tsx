import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions as AuthActions } from 'src/features/auth';
import './login.css';

const { Title } = Typography;

const USERNAME_FILED = 'username';
const PASSWORD_FIELD = 'password';

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      // @ts-ignore
      window.startVanta();
    } catch (err) {
      console.log(err);
    }

    return () => {
      // @ts-ignore
      window.stopVanta();
    }
  }, [])

  const onFinish = useCallback((values) => {
    const username = values[USERNAME_FILED];
    const password = values[PASSWORD_FIELD];
    dispatch(AuthActions.loginRequest({ username, password }));
  }, [dispatch]);

  return (
    <div className="login-form-container">
      <Title>로그인</Title>
      <Form
        onFinish={onFinish}
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
  )
}

export default LoginPage;
