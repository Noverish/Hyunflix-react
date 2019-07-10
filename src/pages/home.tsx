import React from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import './home.css';

import { ServerResponse, Type } from '../models';
import * as service from '../services';
import { FolderPage, VideoPage } from './sub_pages';

const { Header, Content, Footer } = Layout;

export interface HomePageProps {
  history;
}

interface State {
  serverResponse: ServerResponse | null
}

class HomePage extends React.Component<HomePageProps, State> {
  constructor(props) {
    super(props);
    
    this.state = {
      serverResponse: null
    }
  }
  
  componentDidMount() {
    const path = this.props['location']['pathname'];
    console.log(path);
    this.load(path);
  }
  
  load(path: string) {
    service.get(path)
      .then((res: ServerResponse) => {
        this.setState({
          serverResponse: res
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  handleClick(e) {
    const path = e['key']
    this.props.history.push(path);
    this.load(path);
  }

  render() {
    const res: ServerResponse | null = this.state.serverResponse;
    let content = ( <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Home</div> );
    
    if(res) {
      switch (res.type) {
        case Type.folder: {
          content = ( <FolderPage { ...res } /> )
          break;
        }
        case Type.video: {
          content = ( <VideoPage { ...res } /> )
          break;
        }
        case Type.image: {
          content = ( <a href={res.payload['rawUrl']}>{ res.payload['rawUrl'] }</a> )
          break;
        }
        case Type.text: {
          content = ( <a href={res.payload['rawUrl']}>{ res.payload['rawUrl'] }</a> )
          break;
        }
      }
    }
    
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            style={{ lineHeight: '64px' }}
            onClick={this.handleClick.bind(this)}
          >
            <Menu.Item key="/">홈</Menu.Item>
            <Menu.Item key="/archive/Movies">영화</Menu.Item>
            <Menu.Item key="/archive/TV_Series">드라마</Menu.Item>
            <Menu.Item key="/archive/torrents">토렌트</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '20px 50px', background: 'white' }}>
          { content }
        </Content>
        <Footer style={{ textAlign: 'center' }}>hello, world!</Footer>
      </Layout>
    )
  }
}

export default withRouter(HomePage);