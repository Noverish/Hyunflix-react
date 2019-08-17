import React from 'react';
import { Divider , PageHeader } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import { MovieListComp, MainLayout } from 'components';
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
      .catch((msg) => {
        alert(msg);
      })
  }
  
  onBack = () => {
    this.props.history.push('/');
  }
  
  render() {
    return (
      <MainLayout>
        <PageHeader onBack={this.onBack} title='영화' />
        <Divider style={{ margin: '0' }}></Divider>
        <MovieListComp moviePreviews={this.state.moviePreviews}></MovieListComp>
      </MainLayout>
    )
  }
}

export default MoviePage;