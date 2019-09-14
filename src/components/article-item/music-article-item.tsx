import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Music } from 'models';
import { time } from 'utils';
import './article-item.css';

interface Props extends RouteComponentProps {
  highlight: string;
  music: Music
}

interface State {
  
}

class MusicItem extends React.Component<Props, State> {
  
  onClick = (e) => {
    const link = `/musics/${this.props.music.musicId}`;
    // e.preventDefault();
    // this.props.history.push(link);
  }
  
  render() {
    const { highlight } = this.props;
    const music = this.props.music;
    const link = `/musics/${this.props.music.musicId}`;
    
    return (
      <a href={link} className="article-item" onClick={this.onClick}>
        <div>
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

export default withRouter(MusicItem);

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