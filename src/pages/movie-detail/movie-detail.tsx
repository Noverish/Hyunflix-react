import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageHeader, Typography, Dropdown, Button, Menu, Icon } from 'antd';

import { VideoPlayer, MainLayout } from 'components';
import { getMovieDetail } from 'api';
import { Video } from 'models';
import './movie-detail.css';

const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
  
}

interface State {
  video: Video | null;
  width: number;
  resolution: string;
}

class MovieDetailPage extends React.Component<Props, State> {
  videoContainer
  
  state = {
    video: null,
    width: 360,
    resolution: ""
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    
    const path = this.props.match.params[0];
    getMovieDetail('/' + path)
      .then((video: Video) => {
        this.setState({
          video,
          resolution: video.srcs[0].resolution
        })
      })
      .catch((msg) => {
        alert(msg);
      })
  }
  
  componentDidUpdate() {
    this.resize();
  }
  
  onBack = () => {
    this.props.history.goBack();
  }
  
  resize = () => {
    if(this.videoContainer) {
      if(this.state.width !== this.videoContainer.clientWidth) {
        this.setState({ width: this.videoContainer.clientWidth })
      }
    }
  }
  
  handleMenuClick = (e) => {
    this.setState({ resolution: e.key })
  }
  
  render() {
    const video: Video | null = this.state.video;
    
    if(video) {
      const v: Video = video;
      const width = this.state.width;
      const height = Math.floor(width / 16 * 9);
      
      const menuItems = v.srcs.map((value) => (
        <Menu.Item key={value.resolution}>{value.resolution}</Menu.Item>
      ))
      
      const menu = (
        <Menu onClick={this.handleMenuClick}>
          { menuItems }
        </Menu>
      )
      
      return (
        <MainLayout>
          <PageHeader onBack={this.onBack} title={v.title} />
          <div ref={ref => {this.videoContainer = ref}}>
            <VideoPlayer video={video} width={width} height={height} resolution={this.state.resolution}/>
          </div>
          <div style={{ padding: '12px' }}>
            <div>
              <Title className="movie-detail-title" level={4}>{v.title}</Title>
              <Dropdown className="movie-detail-resolution-button" overlay={menu}><Button>{this.state.resolution} <Icon type="down"/></Button></Dropdown>
            </div>
            <Text type="secondary">{v.date}</Text>
          </div>
        </MainLayout>
      )
    }
    
    return (
      <div></div>
    )
  }
}

export default withRouter(MovieDetailPage);