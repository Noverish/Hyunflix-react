import React from 'react';
import { List, Pagination } from 'antd';
import { connect } from 'react-redux';

import { musicNowPlayingChange } from 'actions';
import { default as MusicPlayItem } from './music-play-item';
import { Music } from 'models';
import { PAGE_SIZE } from 'config';

interface Props {
  musicNowPlayingChange(music: Music | null): ReturnType<typeof musicNowPlayingChange>;
  playlist: Music[];
  nowPlaying: Music | null;
}

interface State {
  query: string;
  page: number;
}

class MusicPlaylist extends React.Component<Props, State> {
  state = {
    query: '',
    page: 1,
  }
  
  render() {
    const { page } = this.state;
    const playlist: Music[] = this.props.playlist;
    
    const sliced = playlist.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <div>
        <List
          bordered
          dataSource={sliced}
          renderItem={music =>
            <MusicPlayItem
              index={playlist.indexOf(music)}
              music={music}
              onClick={this.onItemClick}
              selected={this.props.nowPlaying === music}
            />
          }
        />
        <Pagination className="pagenation" current={page} total={playlist.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
      </div>
    )
  }
  
  onItemClick = (music: Music) => {
    this.props.musicNowPlayingChange(music);
  }
  
  onPageChange = (page: number) => {
    this.setState({ page });
  }
}

const mapDispatchToProps = {
  musicNowPlayingChange,
}

const mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
    nowPlaying: state.music.nowPlaying,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlaylist);