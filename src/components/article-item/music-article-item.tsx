import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Checkbox, Tag } from 'antd';
import { connect } from 'react-redux';

import { musicPlaylistAdd } from 'actions';
import { Music } from 'models';
import { time } from 'utils';
import './article-item.css';

interface Props extends RouteComponentProps {
  musicPlaylistAdd(musics: Music[]): void;
  playlist: Music[];
  
  highlight: string;
  music: Music;
  tags: string;
}

interface State {
  
}

class MusicItem extends React.Component<Props, State> {
  
  onClick = (e) => {
    e.preventDefault();
    const { playlist, music } = this.props;
    
    const checked: boolean = playlist.some(m => m.musicId === music.musicId);
    
    if (!checked) {
      this.props.musicPlaylistAdd([music]);
    }
    
    // const link = `/musics/${this.props.music.musicId}`;
    // this.props.history.push(link);
  }
  
  renderTitle = (title: string) => {
    const { highlight } = this.props;
    
    const index = title.search(new RegExp(highlight, 'i'));
    const beforeStr = title.substr(0, index);
    const matchStr = title.substr(index, highlight.length);
    const afterStr = title.substr(index + highlight.length);
    return (index > -1)
      ? (
        <span className="title">
          {beforeStr}
          <span style={{ color: '#f50' }}>{matchStr}</span>
          {afterStr}
        </span>
      )
      : (
        <span className="title">{title}</span>
      );
  }
  
  renderTags = () => {
    const { music, tags } = this.props;
    // TODO 멋있게
    const colorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
    
    return music.tags.map(t => (
      <Tag color={colorList[tags.indexOf(t) % colorList.length]} key={t}>{t}</Tag>
    ))
  }
  
  render() {
    const { playlist, music } = this.props;
    const checked: boolean = playlist.some(m => m.musicId === music.musicId);
    const link = `/articles/musics/${music.musicId}`;
    
    return (
      <a href={link} className="article-item" onClick={this.onClick}>
        <div>
          <Checkbox className="check-box" checked={checked} />
          <span className="id">{music.musicId}</span>
          { this.renderTags() }
          { this.renderTitle(music.title) }
        </div>
        <div>
          <span className="duration">{time.second2String(music.duration)}</span>
        </div>
      </a>
    )
  }
}

const mapDispatchToProps = {
  musicPlaylistAdd,
}

let mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
    tags: state.music.tags,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicItem));
