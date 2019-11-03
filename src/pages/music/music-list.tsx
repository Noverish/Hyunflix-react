import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { musicPlaylistAdd, musicPlaylistRemove } from 'actions';

import { musicList, MusicListResult } from 'api';
import { Music } from 'models';
import { MusicListWrapper } from 'containers';
import { MusicPlayer } from 'components';
import './music-list.css';

interface Props extends RouteComponentProps {
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicPlaylistRemove: typeof musicPlaylistRemove;
  playlist: Music[];
}

class MusicListPage extends React.Component<Props> {
  musicListWrapper = React.createRef<MusicListWrapper>();

  render() {
    const { playlist } = this.props;

    const topRight = (
      <Button.Group className="button-group">
        <Button onClick={this.onAddAllClicked} icon="plus" type="primary">Add all to Playlist</Button>
      </Button.Group>
    );

    return (
      <div className="music-list-page">
        <MusicPlayer />
        <MusicListWrapper
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

export default connect(mapStateToProps, mapDispatchToProps)(MusicListPage);
