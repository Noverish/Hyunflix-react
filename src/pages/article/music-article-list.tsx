import React from 'react';
import { PageHeader, List, Pagination, Input, Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import * as hangul from 'hangul-js';

import { musicListAsync, musicPlaylistAdd } from 'actions';
import { MainLayout, MusicArticleItem, MusicPlayModal, MusicPlayer } from 'components';
import { Music } from 'models';
import { PAGE_SIZE } from 'config';
import './article.css';
import './music-article-list.css';

const { Search } = Input;

interface Props extends RouteComponentProps {
  musicListRequest(): ReturnType<typeof musicListAsync.request>;
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musics: Music[];
}

interface State {
  showPlayModal: boolean;
  query: string;
  page: number;
}

class MusicListPage extends React.Component<Props, State> {
  state = {
    query: '',
    page: 1,
    showPlayModal: false,
  }
  
  componentDidMount() {
    this.props.musicListRequest();
  }
  
  render() {
    const { musics } = this.props;
    const { page, query, showPlayModal } = this.state;
    
    const searcher = new hangul.Searcher(query);
    const searched = (query) ? musics.filter((m: Music) => searcher.search(m.path) > 0) : musics;
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <MainLayout>
        <div className="article-list-page">
          <MusicPlayModal visible={showPlayModal} dismissCallback={this.onMusicPlayModalDismiss} />
          <MusicPlayer />
          <div className="page-header">
            <PageHeader onBack={() => null} title="Music" subTitle="가요, 팝송, BGM" />
            <Search onChange={this.onQueryChange} enterButton />
            <Button.Group className="button-group">
              <Button onClick={this.onPlaylistClicked} icon="menu">Show Playlist</Button>
              <Button onClick={this.onAddAllClicked} icon="plus">Add all to Playlist</Button>
            </Button.Group>
          </div>
          <List
            dataSource={sliced}
            renderItem={music => <MusicArticleItem music={music} highlight={query} />}
          />
          <Pagination className="pagenation" current={page} total={searched.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
        </div>
      </MainLayout>
    )
  }
  
  onPlaylistClicked = () => {
    this.setState({ showPlayModal: true });
  }
  
  onAddAllClicked = () => {
    const { musics } = this.props;
    const { query } = this.state;
    
    const searcher = new hangul.Searcher(query);
    const searched = (query) ? musics.filter((m: Music) => searcher.search(m.path) > 0) : musics;
    
    this.props.musicPlaylistAdd(searched);
  }
  
  onMusicPlayModalDismiss = () => {
    this.setState({ showPlayModal: false });
  }
  
  onQueryChange = (e) => {
    this.setState({ query: e.target.value, page: 1 });
  }
  
  onPageChange = (page: number) => {
    this.setState({ page });
  }
}

const mapDispatchToProps = {
  musicListRequest: musicListAsync.request,
  musicPlaylistAdd,
}

let mapStateToProps = (state) => {
  return {
    musics: state.music.musics,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListPage));