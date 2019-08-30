import React from 'react';
import { List } from 'antd';

import { Music } from 'models';
import { time } from 'utils';
import './music-play-item.css';

interface Props {
  index: number;
  music: Music;
}

interface State {
  
}

export default class MusicSearchItem extends React.Component<Props, State> {
  render() {
    const music = this.props.music;
    return (
      <List.Item className="music-play-item">
        <span>{this.props.index + 1}</span>
        <span>{music.title}</span>
        <span>{time.second2String(music.duration)}</span>
      </List.Item>
    )
  }
}
