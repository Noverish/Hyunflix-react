import React from 'react';
import { List } from 'antd';

import { Music } from 'models';
import { time } from 'utils';
import './music-play-item.css';

interface Props {
  index: number;
  music: Music;
  selected: boolean;
  onClick: (music: Music) => void;
}

interface State {
  
}

export default class MusicSearchItem extends React.Component<Props, State> {
  render() {
    const music = this.props.music;
    const className = (this.props.selected)
      ? "music-play-item selected"
      : "music-play-item"
    
    return (
      <List.Item className={className} onClick={this.onClick}>
        <span>{this.props.index + 1}</span>
        <span>{music.title}</span>
        <span>{time.second2String(music.duration)}</span>
      </List.Item>
    )
  }
  
  onClick = () => {
    this.props.onClick(this.props.music);
  }
}
