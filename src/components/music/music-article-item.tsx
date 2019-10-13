import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Checkbox, Tag, Icon } from 'antd';
import { connect } from 'react-redux';

import { musicPlaylistAdd, musicPlaylistRemove } from 'actions';
import { Music } from 'models';
import { time } from 'utils';

interface Props extends RouteComponentProps {
  music: Music;
  highlight: string;

  // Redux Props
  musicPlaylistAdd(musics: Music[]): void;
  musicPlaylistRemove(music: Music): ReturnType<typeof musicPlaylistRemove>;
  playlist: Music[];
  tags: Map<string, string>;
}

interface State {

}

class MusicItem extends React.Component<Props, State> {
  renderTitle = (title: string) => {
    const { highlight } = this.props;

    const index = title.search(new RegExp(highlight, 'i'));
    const beforeStr = title.substr(0, index);
    const matchStr = title.substr(index, highlight.length);
    const afterStr = title.substr(index + highlight.length);
    return (index > -1)
      ? (
        <span className="article-title">
          {beforeStr}
          <span style={{ color: '#f50' }}>{matchStr}</span>
          {afterStr}
        </span>
      )
      : (
        <span className="article-title">{title}</span>
      );
  }

  renderTags = () => {
    const { music, tags } = this.props;

    return music.tags.map(t => (
      <Tag color={tags.get(t)} key={t}>{t}</Tag>
    ));
  }

  render() {
    const { playlist, music } = this.props;
    const checked: boolean = playlist.some(m => m.id === music.id);
    const link = `/musics/articles/${music.id}`;

    return (
      <a href={link} className="article-item" onClick={this.onClick}>
        <div className="first section">
          <Checkbox className="check-box" checked={checked} />
          <span className="article-id">{music.id}</span>
          {this.renderTags()}
          {this.renderTitle(music.title)}
          { music.youtube && (
            <div onClick={this.youtubeClicked}>
              <Icon type="youtube" style={{ color: '#f5222d' }} />
            </div>
          ) }
        </div>
        <div className="second section">
          <span className="article-date">{time.second2String(music.duration)}</span>
        </div>
      </a>
    );
  }

  onClick = (e) => {
    e.preventDefault();
    const { playlist, music } = this.props;
    const isInPlaylist: boolean = playlist.some(m => m.id === music.id);

    if (!isInPlaylist) {
      this.props.musicPlaylistAdd([music]);
    } else {
      this.props.musicPlaylistRemove(music);
    }

    // const link = `/musics/${this.props.music.id}`;
    // this.props.history.push(link);
  }

  youtubeClicked = (e) => {
    const url = `https://www.youtube.com/watch?v=${this.props.music.youtube}`;
    e.preventDefault();
    e.stopPropagation();
    const win = window.open(url, '_blank');
    win!.focus();
  }
}

const mapDispatchToProps = {
  musicPlaylistAdd,
  musicPlaylistRemove,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
    tags: state.music.tags,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicItem));
