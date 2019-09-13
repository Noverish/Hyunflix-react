import React from 'react';
import { PageHeader, List, Pagination } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { musicList, MusicListAction } from 'actions';
import { MainLayout, MusicArticleItem } from 'components';
import { Music } from 'models';
import { PAGE_SIZE } from 'config';
import './article.css';

interface Props extends RouteComponentProps {
  onMusicList(): MusicListAction;
  musics: Music[]
}

interface State {
  page: number
}

class MusicListPage extends React.Component<Props, State> {
  state = {
    page: 1
  }
  
  componentDidMount() {
    this.props.onMusicList();
  }
  
  render() {
    const { musics } = this.props;
    const { page } = this.state;
    
    const sliced = musics.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <MainLayout>
        <div className="article-list-page">
          <PageHeader onBack={() => null} title="Music" subTitle="가요, 팝송, BGM" />
          <List
            dataSource={sliced}
            renderItem={music => <MusicArticleItem music={music}/>}
          />
          <Pagination className="pagenation" current={page} total={musics.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
        </div>
      </MainLayout>
    )
  }
  
  onPageChange = (page: number) => {
    this.setState({ page })
  }
}

let mapDispatchToProps = (dispatch: Dispatch<MusicListAction>) => {
  return {
    onMusicList: () => dispatch(musicList()),
  }
}

let mapStateToProps = (state) => {
  return {
    musics: state.music.musics,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicListPage));