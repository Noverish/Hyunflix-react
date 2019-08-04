import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageHeader, Typography, Dropdown, Button, Menu, Icon, Layout } from 'antd';

import { VideoPlayer } from 'components';
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
  state = {
    movieDetail: null,
    width: 360,
    resolution: 0
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
    
    const path = this.props.match.params[0];
    getMovieDetail('/' + path)
      .then((movieDetail: MovieDetail) => {
        this.setState({
          movieDetail,
          resolution: movieDetail.videos[0].resolution
        })
      })
  }
  
  onBack = () => {
    this.props.history.goBack();
  }
  
  resize = () => {
    this.setState({ width: window.innerWidth })
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
        <Layout className="movie-detail-layout">
          <div className="movie-detail-container">
            <PageHeader onBack={this.onBack} title={md.title} />
            <VideoPlayer movieDetail={movieDetail} width={width} height={height} resolution={this.state.resolution}/>
            <div style={{ padding: '12px' }}>
              <div>
                <Title className="movie-detail-title" level={4}>{md.title}</Title>
                <Dropdown className="movie-detail-resolution-button" overlay={menu}><Button>{`${this.state.resolution}p`} <Icon type="down"/></Button></Dropdown>
              </div>
              <Text type="secondary">{md.date}</Text>
            </div>
          </div>
        </Layout>
      )
    }
    
    return (
      <div></div>
    )
  }
}

export default withRouter(MovieDetailPage);