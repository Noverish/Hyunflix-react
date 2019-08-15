import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import './main-layout.css';

const { Header, Content, Footer } = Layout;

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class LayoutComp extends React.Component<Props, State> {
  breadcrumbClicked = (e) => {
    e.preventDefault();
    this.props.history.push(e.currentTarget.target);
  }
  
  render() {
    return (
      <Layout className="layout-layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <a href="/" target="/" onClick={this.breadcrumbClicked}>Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}

export default withRouter(LayoutComp);