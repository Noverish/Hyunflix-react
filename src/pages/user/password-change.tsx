import { Button, Form, Input, message, Spin } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from 'src/api';
import { PageHeader } from 'src/components';
import { actions as AuthActions } from 'src/features/auth';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 4 },
};

const OLD_PASSWORD_FIELD = 'oldPassword';
const NEW_PASSWORD_FIELD = 'newPassword';
const NEW_PASSWORD_CONFIRM_FIELD = 'newPasswordConfirm';

const PasswordChangePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback((values) => {
    const oldPassword = values[OLD_PASSWORD_FIELD];
    const newPassword = values[NEW_PASSWORD_FIELD];

    setLoading(true);
    changePassword(oldPassword, newPassword)
      .then(() => {
        message.success('비밀번호 변경에 성공했습니다');
        dispatch(AuthActions.clear());
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <PageHeader title="비밀번호 변경" className="border-top border-bottom" style={{ marginBottom: '32px' }} />
      <Spin spinning={loading}>
        <Form className="border-bottom" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="기존 비밀번호"
            name={OLD_PASSWORD_FIELD}
            rules={[{ required: true, message: '기존 비밀번호를 입력해주세요' }]}
            {...formItemLayout}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="새로운 비밀번호"
            name={NEW_PASSWORD_FIELD}
            rules={[{ required: true, message: '새로운 비밀번호를 입력해주세요' }]}
            {...formItemLayout}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="새로운 비밀번호 확인"
            name={NEW_PASSWORD_CONFIRM_FIELD}
            dependencies={[NEW_PASSWORD_FIELD]}
            rules={[
              { required: true, message: '새로운 비밀번호를 입력해주세요' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue(NEW_PASSWORD_FIELD) === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('위에서 입력하신 비밀번호와 다릅니다!'));
                },
              }),
            ]}
            {...formItemLayout}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">확인</Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  )
}

export default PasswordChangePage;
