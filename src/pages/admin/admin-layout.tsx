import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './admin-layout.css';

const { Header, Content, Footer, Sider } = Layout;

interface Props extends RouteComponentProps {
  
}

interface State {
  isMobile: boolean;
  collapsed: boolean;
}

class AdminLayout extends React.Component<Props, State> {
  state = {
    // TODO 768을 다른데서 가져오기
    isMobile: window.innerWidth <= 768,
    collapsed: false,
  };
  
  render() {
    const { isMobile, collapsed } = this.state;
    const selectedKeys = [this.props.location.pathname.split('/')[1]];
    
    const siderLayoutClass = (collapsed)
      ? "sider-layout collapsed"
      : "sider-layout expanded"
    
    return (
      <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
        <div className={siderLayoutClass}>
          <Sider
            className="sider"
            breakpoint={isMobile ? "md" : undefined}
            collapsed={isMobile ? collapsed : false}
            collapsedWidth={0}
            trigger={null}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onClick={this.menuClicked}>
              <Menu.Item key="explorer">
                <Icon type="folder" />
                <span className="nav-text">파일 탐색기</span>
              </Menu.Item>
              <Menu.Item key="encode">
                <Icon type="youtube" />
                <span className="nav-text">비디오 인코딩</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <div className="sider-rest" onClick={this.toggle}/>
        </div>
        <Layout className="main">
          <Header style={{ background: '#eee', padding: 0 }} >
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{ "display": isMobile ? "block" : "none" }}
            />
          </Header>
          <Content className="content">
            <div className="content-inner">
              { this.props.children }
            </div>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
  
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  
  menuClicked = (e) => {
    this.props.history.push(`/${e.key}`);
    this.toggle();
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
  
  onResize = () => {
    // TODO 768을 다른데서 가져오기
    const prevIsMobile = this.state.isMobile;
    const nextIsMobile = window.innerWidth <= 768;
    if(prevIsMobile !== nextIsMobile) {
      this.setState({ isMobile: nextIsMobile });
    }
  }
}

export default withRouter(AdminLayout);