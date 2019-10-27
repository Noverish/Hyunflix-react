import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { musicPlaylistAdd, musicPlaylistRemove } from 'actions';

import { musicList, MusicListResult } from 'api';
import { Music } from 'models';
import { MusicArticleListWrapper } from 'containers';
import { MusicPlayer } from 'components';
import './music-article-list.css';

interface Props extends RouteComponentProps {
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicPlaylistRemove: typeof musicPlaylistRemove;
  playlist: Music[];
}

class MusicArticleListPage extends React.Component<Props> {
  musicListWrapper = React.createRef<MusicArticleListWrapper>();

  render() {
    const { playlist } = this.props;

    const topRight = (
      <Button.Group className="button-group">
        <Button onClick={this.onAddAllClicked} icon="plus" type="primary">Add all to Playlist</Button>
      </Button.Group>
    );

    return (
      <div className="music-article-list-page">
        <MusicPlayer />
        <MusicArticleListWrapper
          ref={this.musicListWrapper}
          onItemClick={this.onItemClick}
          checklist={playlist}
          topRight={topRight}
        />
      </div>
    );
  }

  onItemClick = (music: Music) => {
    const { playlist } = this.props;

    if (playlist.includes(music)) {
      this.props.musicPlaylistRemove(music);
    } else {
      this.props.musicPlaylistAdd([music]);
    }
  }

  onAddAllClicked = () => {
    const query = this.musicListWrapper.current!.state.query;

    musicList(query, 0, 0)
      .then((result: MusicListResult) => {
        this.props.musicPlaylistAdd(result.results);
      })
      .catch();
  }
}

const mapDispatchToProps = {
  musicPlaylistAdd,
  musicPlaylistRemove,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicArticleListPage);
