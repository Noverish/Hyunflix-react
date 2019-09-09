import React from 'react';
import { PageHeader, List, Pagination, Input } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { TVProgram } from 'models';
import { episodeList, EpisodeListAction } from 'actions';
import { EpisodeItem, MainLayout } from 'components';

const { Search } = Input;

interface Props extends RouteComponentProps {
  onEpisodeList(series): EpisodeListAction;
  episodes: TVProgram[];
}

interface State {
  page: number;
}

class TVProgramEpisodesPage extends React.Component<Props, State> {
  state = {
    page: 1,
  }
  
  componentDidMount() {
    const series = this.props.match.params['series'];
    console.log(this.props.match);
    this.props.onEpisodeList(series);
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
            dataSource={this.props.episodes}
            renderItem={ episode => (
              <EpisodeItem tvProgram={episode}/>
            )}
          />
        </div>
        <div className="pagination-layout">
          <Pagination current={page} total={this.props.episodes.length} onChange={this.onChange} />
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

let mapDispatchToProps = (dispatch: Dispatch<EpisodeListAction>) => {
  return {
    onEpisodeList: (series) => dispatch(episodeList(series)),
  }
}

let mapStateToProps = (state) => {
  return {
    episodes: state.tvProgram.episodes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVProgramEpisodesPage);