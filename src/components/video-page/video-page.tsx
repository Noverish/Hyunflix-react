import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageHeader, Typography, Dropdown, Button, Menu, Icon } from 'antd';

import { VideoPlayer } from 'components';
import { Video } from 'models';

const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
  video: Video;
}

interface State {
  width: number;
  resolution: string;
}

class MovieDetailPage extends React.Component<Props, State> {
  videoContainer: HTMLDivElement | null = null;
  
  state = {
    width: 360,
    resolution: ""
  }
  
  static getDerivedStateFromProps(props: Props, state: State) {
    if(state.resolution === "") {
      return { resolution: props.video.srcs[0].resolution };
    }
    return {};
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  
  resize = () => {
    if(this.videoContainer) {
      if(this.state.width !== this.videoContainer.clientWidth) {
        this.setState({ width: this.videoContainer.clientWidth })
      }
    }
  }
  
  render() {
    const width = this.state.width;
    const height = Math.floor(width / 16 * 9);
    
    const menuItems = this.props.video.srcs.map((value) => (
      <Menu.Item key={value.resolution}>{value.resolution}</Menu.Item>
    ))
    
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        { menuItems }
      </Menu>
    )
    
    return (
      <React.Fragment>
        <PageHeader onBack={this.onBack} title={this.props.video.title} />
        <div ref={ref => {
          this.videoContainer = ref;
          this.resize();
        }}>
          <VideoPlayer video={this.props.video} width={width} height={height} resolution={this.state.resolution}/>
        </div>
        <div style={{ padding: '12px' }}>
          <div>
            <Title className="video-title" level={4}>{this.props.video.title}</Title>
            <Dropdown className="video-resolution-button" overlay={menu}><Button>{this.state.resolution} <Icon type="down"/></Button></Dropdown>
          </div>
          <Text type="secondary">{this.props.video.date}</Text>
        </div>
      </React.Fragment>
    )
  }
  
  onBack = () => {
    
  }
  
  handleMenuClick = (e) => {
    this.setState({ resolution: e.key })
  }
}

export default withRouter(MovieDetailPage);