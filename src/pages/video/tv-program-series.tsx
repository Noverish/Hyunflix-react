import React from 'react';
import { PageHeader, List, Pagination, Input } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { seriesList, SeriesListAction } from 'actions';
import { SeriesItem, MainLayout } from 'components';

const { Search } = Input;

interface Props extends RouteComponentProps {
  onSeriesList(): SeriesListAction;
  series: string[];
}

interface State {
  page: number;
}

class TVProgramSeriesPage extends React.Component<Props, State> {
  state = {
    page: 1,
  }
  
  componentDidMount() {
    this.props.onSeriesList();
  }
  
  onBack = () => {
    
  }
  
  render() {
    const page = this.state.page;
    
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
            dataSource={this.props.series}
            renderItem={ series => (
              <SeriesItem series={series}/>
            )}
          />
        </div>
        <div className="pagination-layout">
          <Pagination current={page} total={this.props.series.length} onChange={this.onChange} />
        </div>
      </MainLayout>
    )
  }
  
  onSearch = (value) => {
    
  }
  
  
  onChange = (page) => {
    this.setState({ page })
  }
}

let mapDispatchToProps = (dispatch: Dispatch<SeriesListAction>) => {
  return {
    onSeriesList: () => dispatch(seriesList()),
  }
}

let mapStateToProps = (state) => {
  return {
    series: state.tvProgram.series,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVProgramSeriesPage);