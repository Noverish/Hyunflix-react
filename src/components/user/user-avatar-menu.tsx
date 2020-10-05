import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/features';
import { actions as AuthActions } from 'src/features/auth';

const USER_VIDEOS = 'user-videos';
const LOGOUT = 'logout';
const CHANGE_PASSWORD = 'change-password';

const UserAvatarMenu = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  const onClick = ({ key }) => {
    if (key === LOGOUT) {
      dispatch(AuthActions.clear());
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item>
        @
        {username}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={USER_VIDEOS}><Link to="/user/videos">시청 기록</Link></Menu.Item>
      <Menu.Item key={CHANGE_PASSWORD}><Link to="/user/password-change">비밀번호 변경</Link></Menu.Item>
      <Menu.Divider />
      <Menu.Item key={LOGOUT}>로그아웃</Menu.Item>
    </Menu>
  );

  const avatar = useMemo(() => (
    (username)
      ? <Avatar style={{ backgroundColor: '#f56a00' }}>{username}</Avatar>
      : <Avatar icon={<UserOutlined />}></Avatar>
  ), [username]);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      {avatar}
    </Dropdown>
  );
};

export default UserAvatarMenu;
