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
    this.props.history.push(`/${e.key}`);
  }
  
  render() {
    const path = this.props.match.path;
    const first = path.split('/')[1];
    
    return (
      <Layout className="main-layout">
        <Header className="main-layout-header">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[first]}
            style={{ lineHeight: '64px' }}
            onClick={this.menuClicked}
          >
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="movies">영화</Menu.Item>
            <Menu.Item key="musics">음악</Menu.Item>
            <Menu.Item key="tv-programs">예능/드라마</Menu.Item>
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