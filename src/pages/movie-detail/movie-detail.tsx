import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageHeader, Typography, Dropdown, Button, Menu, Icon } from 'antd';

import { VideoPlayer, MainLayout } from 'components';
import { getMovieDetail } from 'api';
import { MovieDetail } from 'models';
import './movie-detail.css';

const { Title, Text } = Typography;

interface Props extends RouteComponentProps {
  
}

interface State {
  movieDetail: MovieDetail | null;
  width: number;
  resolution: number;
}

class MovieDetailPage extends React.Component<Props, State> {
  videoContainer
  
  state = {
    movieDetail: null,
    width: 360,
    resolution: 0
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    
    const path = this.props.match.params[0];
    getMovieDetail('/' + path)
      .then((movieDetail: MovieDetail) => {
        this.setState({
          movieDetail,
          resolution: movieDetail.videos[0].resolution
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
    this.setState({ resolution: parseInt(e.key, 10) })
  }
  
  render() {
    const movieDetail: MovieDetail | null = this.state.movieDetail;
    
    if(movieDetail) {
      const md: MovieDetail = movieDetail;
      const width = this.state.width;
      const height = Math.floor(width / 16 * 9);
      
      const menuItems = md.videos.map((value) => (
        <Menu.Item key={value.resolution}>{`${value.resolution}p`}</Menu.Item>
      ))
      
      const menu = (
        <Menu onClick={this.handleMenuClick}>
          { menuItems }
        </Menu>
      )
      
      return (
        <MainLayout>
          <PageHeader onBack={this.onBack} title={md.title} />
          <div ref={ref => {this.videoContainer = ref}}>
            <VideoPlayer movieDetail={movieDetail} width={width} height={height} resolution={this.state.resolution}/>
          </div>
          <div style={{ padding: '12px' }}>
            <div>
              <Title className="movie-detail-title" level={4}>{md.title}</Title>
              <Dropdown className="movie-detail-resolution-button" overlay={menu}><Button>{`${this.state.resolution}p`} <Icon type="down"/></Button></Dropdown>
            </div>
            <Text type="secondary">{md.date}</Text>
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