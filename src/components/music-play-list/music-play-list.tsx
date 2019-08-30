import React from 'react';
import { List, Button } from 'antd';

import { MusicAddModal } from 'components';
import { default as MusicPlayItem } from './music-play-item';
import { Music } from 'models';

interface Props {
  musics: Music[];
  onPlaylistChanged: (musics: Music[]) => void;
  onItemClick: (music: Music) => void;
  nowPlaying: Music | null;
}

interface State {
  query: string;
  playlist: Music[];
  addModalVisible: boolean;
}

export default class extends React.Component<Props, State> {
  state = {
    query: '',
    playlist: [],
    addModalVisible: false,
  }
  
  renderHeader = () => {
    return (
      <div>
        <Button type="primary" size="large" icon="plus" onClick={this.onAddBtnClicked}>
          곡 추가
        </Button>
        <MusicAddModal visible={this.state.addModalVisible} musics={this.props.musics} onAdd={this.onAdd} />
      </div>
    )
  }
  
  render() {
    const playlist: Music[] = this.state.playlist;
    
    return (
      <div>
        <List
          header={this.renderHeader()}
          bordered
          dataSource={playlist}
          renderItem={(music: Music, index: number) =>
            <MusicPlayItem
              index={index}
              music={music}
              onClick={this.props.onItemClick}
              selected={this.props.nowPlaying === music}
            />
          }
        />
      </div>
    )
  }
  
  onAdd = (musics: Music[]) => {
    const playlist: Music[] = this.state.playlist;
    const newPlaylist: Music[] = playlist.concat(musics);
    
    this.setState({
      playlist: newPlaylist,
      addModalVisible: false,
    });
    
    this.props.onPlaylistChanged(newPlaylist);
  }
  
  onAddBtnClicked = () => {
    this.setState({
      addModalVisible: true,
    });
  }
}
