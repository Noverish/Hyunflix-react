import React from 'react';
import { PageHeader, List, Pagination } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import { MovieItem, MainLayout } from 'components';
import { Movie } from 'models';
import { getMoviePreviewList } from 'api';
import './movie-list.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  movies: Movie[]
  page: number
}

class MoviePage extends React.Component<Props, State> {
  state = {
    movies: [],
    page: 1
  }
  
  componentDidMount() {
    getMoviePreviewList()
      .then((movies: Movie[]) => {
        this.setState({
          movies
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
    const page = this.state.page;
    const subItems = this.state.movies.slice((page - 1) * 10, (page) * 10);
    
    return (
      <MainLayout>
        <PageHeader onBack={this.onBack} title='영화' />
        <div className="movie-page-item-list">
          <List
            dataSource={subItems}
            renderItem={ movie => (
              <MovieItem movie={movie}/>
            )}
          />
        </div>
        <div className="pagination-layout">
          <Pagination current={page} total={this.state.movies.length} onChange={this.onChange} />
        </div>
      </MainLayout>
    )
  }
  
  onChange = (page) => {
    this.setState({ page })
  }
}

export default MoviePage;