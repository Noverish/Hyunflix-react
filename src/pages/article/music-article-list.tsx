import React from 'react';
import { PageHeader, List, Pagination, Input, Button, Spin } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { musicListAsync, musicPlaylistAdd, musicTagListAsync, musicSearch } from 'actions';
import { MainLayout, MusicArticleItem, MusicPlayer } from 'components';
import { Music } from 'models';
import { PAGE_SIZE } from 'config';
import './article.css';
import './music-article-list.css';

const { Search } = Input;

interface Props extends RouteComponentProps {
  musicListRequest(): ReturnType<typeof musicListAsync.request>;
  musicTagList(): ReturnType<typeof musicTagListAsync.request>;
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicSearch(query: string): ReturnType<typeof musicSearch.request>;
  searched: Music[];
  loading: boolean;
}

interface State {
  page: number;
}

class MusicListPage extends React.Component<Props, State> {
  query: string = '';
  
  state = {
    page: 1,
  }
  
  componentDidMount() {
    this.props.musicListRequest();
    this.props.musicTagList();
  }
  
  render() {
    const { searched, loading } = this.props;
    const { page } = this.state;
    const { query } = this;
    
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <MainLayout>
        <div className="article-list-page">
          <MusicPlayer />
          <div className="page-header">
            <PageHeader onBack={() => null} title="Music" subTitle="가요, 팝송, BGM" />
            <Search onChange={this.onQueryChange} enterButton />
            <Button.Group className="button-group">
              <Button onClick={this.onAddAllClicked} icon="plus" type="primary">Add all to Playlist</Button>
            </Button.Group>
          </div>
          <Spin spinning={loading}>
            <List
              dataSource={sliced}
              renderItem={music => <MusicArticleItem music={music} highlight={query} />}
            />
          </Spin>
          <Pagination current={page} total={searched.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
        </div>
      </MainLayout>
    )
  }
  
  onAddAllClicked = () => {
    const { searched } = this.props;
    this.props.musicPlaylistAdd(searched);
  }
  
  onQueryChange = (e) => {
    const query = e.target.value;
    this.props.musicSearch(query);
    this.query = query;
    this.setState({ page: 1 });
  }
  
  onPageChange = (page: number) => {
    this.setState({ page });
  }
}

const mapDispatchToProps = {
  musicListRequest: musicListAsync.request,
  musicTagList: musicTagListAsync.request,
  musicPlaylistAdd,
  musicSearch: musicSearch.request,
}

let mapStateToProps = (state) => {
  return {
    searched: state.music.searched,
    loading: state.music.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListPage));