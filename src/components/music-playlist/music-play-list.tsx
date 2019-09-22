import React from 'react';
import { List } from 'antd';
import { connect } from 'react-redux';

import { musicNowPlayingChange } from 'actions';
import { default as MusicPlayItem } from './music-play-item';
import { Music } from 'models';

interface Props {
  musicNowPlayingChange(music: Music | null): ReturnType<typeof musicNowPlayingChange>;
  playlist: Music[];
  nowPlaying: Music | null;
}

interface State {
  
}

class MusicPlayList extends React.Component<Props, State> {
  render() {
    const playlist: Music[] = this.props.playlist;
    
    return (
      <List
        className="music-play-list"
        bordered
        dataSource={playlist}
        renderItem={music =>
          <MusicPlayItem
            index={playlist.indexOf(music)}
            music={music}
            onClick={this.onItemClick}
            selected={((this.props.nowPlaying) ? this.props.nowPlaying.musicId : null) === music.musicId}
          />
        }
      />
    )
  }
  
  onItemClick = (music: Music) => {
    this.props.musicNowPlayingChange(music);
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

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayList);