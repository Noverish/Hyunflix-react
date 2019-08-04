import React from 'react';
import { Layout, Divider , PageHeader } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import { MovieListComp } from 'components';
import { MoviePreview } from 'models';
import { getMoviePreviewList } from 'api';
import './movie-list.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  moviePreviews: MoviePreview[]
}

class MoviePage extends React.Component<Props, State> {
  state = {
    moviePreviews: []
  }
  
  componentDidMount() {
    getMoviePreviewList()
      .then((moviePreviews: MoviePreview[]) => {
        this.setState({
          moviePreviews
        })
      })
  }
  
  onBack = () => {
    this.props.history.push('/');
  }
  
  render() {
    return (
      <Layout className="movie-list-layout">
        <div className="movie-list-container">
          <PageHeader onBack={this.onBack} title='영화' />
          <Divider style={{ margin: '0' }}></Divider>
          <MovieListComp moviePreviews={this.state.moviePreviews}></MovieListComp>
        </div>
      </Layout>
    )
  }
}

export default MoviePage;