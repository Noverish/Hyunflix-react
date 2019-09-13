import React from 'react';
import { Typography } from 'antd';

import { musicList } from 'api';
import { MainLayout, MusicPlayList } from 'components';
import { Music } from 'models';
import './music.css';

interface Props {
  
}

interface State {
  musics: Music[];
  nowPlaying: Music | null;
}

class MusicPage extends React.Component<Props, State> {
  audioTag: HTMLAudioElement | null = null;
  playlist: Music[] = [];
  
  state = {
    musics: [],
    nowPlaying: null,
  }
  
  componentDidMount() {
    musicList()
      .then((musics: Music[]) => {
        this.setState({ musics })
      })
      .catch((msg: string) => {
        
      })
  }
  
  render() {
    const nowPlaying: Music | null = this.state.nowPlaying;
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
        <MusicPlayList musics={this.state.musics} onPlaylistChanged={this.onPlaylistChanged} onItemClick={this.changeMusic} nowPlaying={this.state.nowPlaying}/>
      </MainLayout>
    )
  }
  
  componentDidUpdate() {
    if(this.audioTag) {
      this.audioTag.load();
    }
  }
  
  onPlaylistChanged = (playlist: Music[]) => {
    this.playlist = playlist;
    
    if(this.state.nowPlaying === null) {
      this.setState({
        nowPlaying: playlist[0],
      })
    }
  }
  
  onMusicEnded = (e) => {
    const nowPlaying: Music = this.state.nowPlaying!;
    
    if(this.playlist.includes(nowPlaying)) {
      const index: number = this.playlist.indexOf(nowPlaying);
      this.changeMusic(this.playlist[index + 1]);
    } else {
      this.changeMusic(this.playlist[0]);
    }
  }
  
  changeMusic = (music: Music) => {
    const index: number = this.playlist.indexOf(music);
    
    if(index < 0) {
      console.log('ERROR CODE 1000');
      return;
    }
    
    this.setState({
      nowPlaying: this.playlist[index],
    });
  }
}

export default MusicPage;
