import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { UserAvatarMenu } from 'src/components';
import './main-layout.css';

const { Header, Content } = Layout;

const MainLayout: React.FunctionComponent<RouteComponentProps> = (props) => {
  const path: string = props.location.pathname;

  const items = [
    { name: '홈', path: '/' },
    { name: '동영상', path: '/videos' },
    { name: '음악', path: '/musics' },
    { name: '만화', path: '/comics' },
  ];

  const itemComps = items.map(i => (
    <Menu.Item key={i.path}>
      <Link to={i.path}>{i.name}</Link>
    </Menu.Item>
  ));

  const selectedKeys: string[] = items.slice(1).filter(i => path.startsWith(i.path)).map(i => i.path);
  if (path === '/') {
    selectedKeys.push('/');
  }

  return (
    <Layout className="main-layout">
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          style={{ lineHeight: '64px' }}
        >
          {itemComps}
        </Menu>
        <UserAvatarMenu />
      </Header>
      <Content className="main-layout-content">
        <div className="main-layout-content-inner">
          {props.children}
        </div>
      </Content>
    </Layout>
  );
};

export default withRouter(MainLayout);
