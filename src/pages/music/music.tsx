import React from 'react';
import { Typography, Button } from 'antd';
import { connect } from 'react-redux';

import { musicPlaylistAdd, musicListAsync, musicNowPlayingChange } from 'actions';
import { MainLayout, MusicPlayList, MusicAddModal } from 'components';
import { Music } from 'models';
import './music.css';

interface Props {
  musicListAsyncRequest(): ReturnType<typeof musicListAsync.request>;
  musicPlaylistAdd(playlist: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicNowPlayingChange(music: Music | null): ReturnType<typeof musicNowPlayingChange>;
  playlist: Music[];
  nowPlaying: Music | null;
}

interface State {
  addModalVisible: boolean;
}

class MusicPage extends React.Component<Props, State> {
  audioTag: HTMLAudioElement | null = null;
  
  state = {
    addModalVisible: false,
  }
  
  componentDidMount() {
    this.props.musicListAsyncRequest();
  }
  
  render() {
    const { nowPlaying } = this.props;
    
    const source = (nowPlaying)
      ? <source src={nowPlaying!.url} type="audio/mpeg" />
      : null
    
    const title = (nowPlaying)
      ? <Typography.Title style={{textAlign: 'center'}}>{nowPlaying!.title}</Typography.Title>
      : null
    
    return (
      <MainLayout>
        {title}
        <audio controls autoPlay style={{ width: '100%' }} onEnded={this.onMusicEnded} ref={ref => { this.audioTag = ref }}>
          {source}
        </audio>
        <Button type="primary" size="large" icon="plus" onClick={this.onAddBtnClicked}>곡 추가</Button>
        <MusicAddModal visible={this.state.addModalVisible} dismissCallback={this.onAddModalDismiss} />
        <MusicPlayList />
      </MainLayout>
    )
  }
  
  componentDidUpdate() {
    if(this.audioTag) {
      this.audioTag.load();
    }
  }
  
  onAddBtnClicked = () => {
    this.setState({ addModalVisible: true });
  }
  
  onAddModalDismiss = () => {
    this.setState({ addModalVisible: false });
  }
  
  onMusicEnded = (e) => {
    const { playlist, nowPlaying, musicNowPlayingChange } = this.props;
    
    if (nowPlaying !== null) {
      const index: number = playlist.indexOf(nowPlaying);
      musicNowPlayingChange(playlist[(index + 1) % playlist.length]);
    }
  }
}

const mapDispatchToProps = {
  musicPlaylistAdd,
  musicListAsyncRequest: musicListAsync.request,
  musicNowPlayingChange,
}

const mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
    nowPlaying: state.music.nowPlaying,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage);
