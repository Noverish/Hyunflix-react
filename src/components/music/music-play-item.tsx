import React from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

import { musicNowPlayingChange, musicPlaylistRemove } from 'actions';
import { Music } from 'models';
import { time } from 'utils';
import './music-play-item.css';

interface Props {
  musicNowPlayingChange(music: Music | null): ReturnType<typeof musicNowPlayingChange>;
  musicPlaylistRemove(music: Music): ReturnType<typeof musicPlaylistRemove>;
  
  index: number;
  music: Music;
  selected: boolean;
}

interface State {
  
}

class MusicSearchItem extends React.Component<Props, State> {
  render() {
    const music = this.props.music;
    const className = (this.props.selected)
      ? "music-play-item selected"
      : "music-play-item"
    
    return (
      <div className={className}>
        <div className="info" onClick={this.onClick}>
          <span className="index">{this.props.index + 1}</span>
          <span className="title">{music.title}</span>
          <span className="time">{time.second2String(music.duration)}</span>
        </div>
        <div className="remove-btn" onClick={this.onRemoveClick}>
          <Icon type="close"/>
        </div>
      </div>
    )
  }
  
  onClick = () => {
    this.props.musicNowPlayingChange(this.props.music);
  }
  
  onRemoveClick = () => {
    this.props.musicPlaylistRemove(this.props.music);
  }
}

const mapDispatchToProps = {
  musicNowPlayingChange,
  musicPlaylistRemove,
}

export default connect(undefined, mapDispatchToProps)(MusicSearchItem);