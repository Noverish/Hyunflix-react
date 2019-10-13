import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import './main-layout.css';

const { Header, Content, Footer } = Layout;

interface Props extends RouteComponentProps {
  isAdmin: number;
}

const MainLayout: React.FunctionComponent<Props> = (props) => {
  const path: string = props.location.pathname;

  const items = [
    { name: 'Home', path: '/home' },
    { name: 'Video', path: '/videos' },
    { name: 'Music', path: '/musics' },
  ];
  if (props.isAdmin) {
    items.push({ name: 'Admin', path: '/admin' });
  }

  const itemComps = items.map(i => (
    <Menu.Item key={i.name}>
      <Link to={i.path}>{i.name}</Link>
    </Menu.Item>
  ));

  const selectedKeys: string[] = items.filter(i => path.startsWith(i.path)).map(i => i.name);

  return (
    <Layout className="main-layout">
      <Header className="main-layout-header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          style={{ lineHeight: '64px' }}
        >
          {itemComps}
        </Menu>
      </Header>
      <Content className="main-layout-content">
        <div className="main-layout-content-inner">
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapStateToProps)(withRouter(MainLayout));
