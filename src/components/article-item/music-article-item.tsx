import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Checkbox } from 'antd';
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
  
  render() {
    const { highlight, playlist, music } = this.props;
    const checked: boolean = playlist.some(m => m.musicId === music.musicId);
    const link = `/articles/musics/${music.musicId}`;
    
    return (
      <a href={link} className="article-item" onClick={this.onClick}>
        <div>
          <Checkbox className="check-box" checked={checked} />
          <span className="id">{music.musicId}</span>
          <span className="title">{renderTitle(music.title, highlight)}</span>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicItem));

function renderTitle(title: string, query: string) {
  const index = title.indexOf(query);
  const beforeStr = title.substr(0, index);
  const afterStr = title.substr(index + query.length);
  return (index > -1)
    ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{query}</span>
        {afterStr}
      </span>
    )
    : (
      <span>{title}</span>
    );
}