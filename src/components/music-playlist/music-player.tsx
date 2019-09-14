import React from 'react';
import { Typography } from 'antd';
import { connect } from 'react-redux';

import { musicNowPlayingChange } from 'actions';
import { Music } from 'models';

interface Props {
  musicNowPlayingChange(music: Music | null): ReturnType<typeof musicNowPlayingChange>;
  playlist: Music[];
  nowPlaying: Music | null;
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
    const { playlist, nowPlaying } = this.props;
    
    if (nowPlaying !== null) {
      const index: number = playlist.indexOf(nowPlaying);
      this.props.musicNowPlayingChange(playlist[(index + 1) % playlist.length]);
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);