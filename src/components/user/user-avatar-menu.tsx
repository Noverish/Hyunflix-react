import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';

import { logoutAsync } from 'actions';

interface Props {
  logout(): ReturnType<typeof logoutAsync.request>;
}

const UserAvatarMenu: React.FunctionComponent<Props> = (props) => {
  const onClick = ({ key }) => {
    if (key === 'logout') {
      props.logout();
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="0"><Link to="/user/videos">시청 기록</Link></Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">로그아웃</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar icon="user" />
    </Dropdown>
  );
};

const mapDispatchToProps = {
  logout: logoutAsync.request,
};

export default connect(undefined, mapDispatchToProps)(UserAvatarMenu);
