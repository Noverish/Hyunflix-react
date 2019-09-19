import React from 'react';
import { Typography } from 'antd';
import { connect } from 'react-redux';

import { musicNowPlayingChange } from 'actions';
import { Music, LoopPlayType } from 'models';

interface Props {
  musicNowPlayingChange(music: Music | null): ReturnType<typeof musicNowPlayingChange>;
  playlist: Music[];
  nowPlaying: Music | null;
  randomPlay: boolean;
  loopPlay: number;
}

interface State {
  
}

class MusicPlayer extends React.Component<Props, State> {
  audioTag: HTMLAudioElement | null = null;
  
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextProps.nowPlaying !== this.props.nowPlaying;
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
      <div className="music-player">
        {title}
        <audio controls autoPlay style={{ width: '100%' }} onEnded={this.onMusicEnded} ref={ref => { this.audioTag = ref }}>
          {source}
        </audio>
      </div>
    )
  }
  
  componentDidUpdate() {
    if(this.audioTag) {
      this.audioTag.load();
    }
  }
  
  onMusicEnded = (e) => {
    const { playlist, nowPlaying, randomPlay, loopPlay } = this.props;
    
    if (nowPlaying !== null) {
      const index: number = playlist.indexOf(nowPlaying);
      let nextIndex: number = 0;
      
      if (loopPlay === LoopPlayType.LOOP_ONE) {
        nextIndex = index;
      } else if (loopPlay === LoopPlayType.NO_LOOP) {
        if (randomPlay) {
          nextIndex = Math.floor(Math.random() * playlist.length);
        } else {
          nextIndex = (index + 1 < playlist.length) ? (index + 1) : -1;
        }
      } else if (loopPlay === LoopPlayType.LOOP_ALL) {
        if (randomPlay) {
          nextIndex = Math.floor(Math.random() * playlist.length);
        } else {
          nextIndex = (index + 1) % playlist.length;
        }
      }
      
      if (index === nextIndex) {
        if(this.audioTag) {
          this.audioTag.currentTime = 0;
          this.audioTag.play();
        }
      } else {
        this.props.musicNowPlayingChange((nextIndex >= 0) ? playlist[nextIndex] : null);
      }
      
    }
  }
}

const mapDispatchToProps = {
  musicNowPlayingChange,
}

const mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
    nowPlaying: state.music.nowPlaying,
    randomPlay: state.music.randomPlay,
    loopPlay: state.music.loopPlay,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);