import React from 'react';
import { PageHeader, List, Pagination } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import { MovieItem, MainLayout } from 'components';
import { MoviePreview } from 'models';
import { getMoviePreviewList } from 'api';
import './movie-list.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  moviePreviews: MoviePreview[]
  page: number
}

class MoviePage extends React.Component<Props, State> {
  state = {
    moviePreviews: [],
    page: 1
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
    const page = this.state.page;
    const subItems = this.state.moviePreviews.slice((page - 1) * 10, (page) * 10);
    
    return (
      <MainLayout>
        <PageHeader onBack={this.onBack} title='영화' />
        <div className="movie-page-item-list">
          <List
            dataSource={subItems}
            renderItem={ moviePreview => (
              <MovieItem moviePreview={moviePreview}/>
            )}
          />
        </div>
        <div className="pagination-layout">
          <Pagination current={page} total={this.state.moviePreviews.length} onChange={this.onChange} />
        </div>
      </MainLayout>
    )
  }
  
  onChange = (page) => {
    this.setState({ page })
  }
}

export default MoviePage;