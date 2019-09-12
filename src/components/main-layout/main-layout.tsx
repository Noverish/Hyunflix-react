import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './main-layout.css';

const { Header, Content, Footer } = Layout;

interface Props extends RouteComponentProps {
  
}

interface State {
  
}

class LayoutComp extends React.Component<Props, State> {
  menuClicked = (e) => {
    this.props.history.push(e.key);
  }
  
  render() {
    const path = this.props.match.path;
    
    const items = [
      { name: 'Home', path: '/home' },
      { name: 'Video', path: '/articles/videos' },
      { name: 'Music', path: '/musics' },
    ]
    
    const itemComps = items.map(i => <Menu.Item key={i.path}>{i.name}</Menu.Item>)
    const selectedKeys: string[] = items.filter(i => path.startsWith(i.path)).map(i => i.path);
    
    return (
      <Layout className="main-layout">
        <Header className="main-layout-header">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            style={{ lineHeight: '64px' }}
            onClick={this.menuClicked}
          >
            {itemComps}
          </Menu>
        </Header>
        <Content className="main-layout-content">
          <div className="main-layout-content-inner">
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}

export default withRouter(LayoutComp);