import React from 'react';
import { PageHeader, List, Pagination, Input } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { movieList, MovieListAction } from 'actions';
import { MovieItem, MainLayout } from 'components';
import { Movie } from 'models';
import './movie-list.css';

const { Search } = Input;

interface Props extends RouteComponentProps {
  onMovieList(): MovieListAction;
  movies: Movie[];
}

interface State {
  searchQuery: string;
  page: number;
}

class MoviePage extends React.Component<Props, State> {
  state = {
    searchQuery: '',
    page: 1
  }
  
  componentDidMount() {
    this.props.onMovieList();
  }
  
  onBack = () => {
    this.props.history.push('/');
  }
  
  render() {
    const page = this.state.page;
    const searched = this.props.movies.filter((m: Movie) => m.title.indexOf(this.state.searchQuery) >= 0 );
    const subItems = searched.slice((page - 1) * 10, (page) * 10);
    
    return (
      <MainLayout>
        <PageHeader className="movie-page-header" onBack={this.onBack} title='영화' >
         <Search
            className="movie-page-search"
            onSearch={this.onSearch}
            enterButton
          />
        </PageHeader>
         
        <div className="movie-page-item-list">
          <List
            dataSource={subItems}
            renderItem={ movie => (
              <MovieItem movie={movie}/>
            )}
          />
        </div>
        <div className="pagination-layout">
          <Pagination current={page} total={searched.length} onChange={this.onChange} />
        </div>
      </MainLayout>
    )
  }
  
  onSearch = (value) => {
    this.setState({ searchQuery: value });
  }
  
  onChange = (page) => {
    this.setState({ page })
  }
}

let mapDispatchToProps = (dispatch: Dispatch<MovieListAction>) => {
  return {
    onMovieList: () => dispatch(movieList()),
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);