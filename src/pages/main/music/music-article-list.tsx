import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { debounce } from 'debounce';

import { musicPlaylistAdd, musicPlaylistRemove } from 'actions';
import { musicList, MusicListResult } from 'api';
import { Music } from 'models';
import { MusicArticleList, MusicPlayer } from 'components';
import { USER_INPUT_DEBOUNCE, PAGE_SIZE } from 'config';
import './music-article-list.css';

interface Props extends RouteComponentProps {
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicPlaylistRemove: typeof musicPlaylistRemove;
  playlist: Music[];
}

interface State {
  musics: Music[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  query: string;
}

class MusicArticleListPage extends React.Component<Props, State> {
  state = {
    musics: [] as Music[],
    total: 0,
    page: 1,
    pageSize: PAGE_SIZE,
    loading: false,
    query: '',
  };

  componentDidMount() {
    const { query, page, pageSize } = this.state;
    this.search(query, page, pageSize);
  }

  render() {
    const { playlist } = this.props;
    const { musics, total, page, pageSize, loading } = this.state;

    return (
      <div className="music-article-list-page">
        <MusicPlayer />
        <MusicArticleList
          onPageChange={this.onPageChange}
          onQueryChange={this.onQueryChange}
          onItemClick={this.onItemClick}
          musics={musics}
          checklist={playlist}
          page={page}
          pageSize={pageSize}
          loading={loading}
          total={total}
          topRight={
            <Button.Group className="button-group">
              <Button onClick={this.onAddAllClicked} icon="plus" type="primary">Add all to Playlist</Button>
            </Button.Group>
          }
        />
      </div>
    );
  }

  debouncedOnQueryChange = debounce((query: string) => {
    const { page, pageSize } = this.state;
    if (this.state.query !== query) {
      this.search(query, page, pageSize);
    } else {
      this.setState({ loading: false });
    }
  }, USER_INPUT_DEBOUNCE);

  onQueryChange = (query: string) => {
    this.state.loading || this.setState({ loading: true });
    this.debouncedOnQueryChange(query);
  }

  onPageChange = (page: number) => {
    const { query, pageSize } = this.state;
    this.search(query, page, pageSize);
  }

  onItemClick = (music: Music) => {
    const { playlist } = this.props;

    if (playlist.includes(music)) {
      this.props.musicPlaylistRemove(music);
    } else {
      this.props.musicPlaylistAdd([music]);
    }
  }

  onAddAllClicked = () => {
    const { query } = this.state;

    musicList(query, 0, 0)
      .then((result: MusicListResult) => {
        this.props.musicPlaylistAdd(result.results);
      })
      .catch();
  }

  search = (query: string, page: number, pageSize: number) => {
    this.setState({ loading: true });

    musicList(query, page, pageSize)
      .then((result: MusicListResult) => {
        this.setState({
          query,
          page,
          pageSize,
          loading: false,
          musics: result.results,
          total: result.total,
        });
      })
      .catch();
  }
}

const mapDispatchToProps = {
  musicPlaylistAdd,
  musicPlaylistRemove,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicArticleListPage);
