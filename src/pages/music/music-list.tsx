import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import find from 'lodash/find';

import { musicPlaylistAdd, musicPlaylistRemove } from 'actions';

import { musicList } from 'api';
import { Music, PlaylistDiff } from 'models';
import { MusicList } from 'components';
import withContainer from 'components/hoc/container';
import './music-list.css';

interface Props extends RouteComponentProps {
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicPlaylistRemove: typeof musicPlaylistRemove;
  playlistDiff: PlaylistDiff;
}

class MusicListContainer extends withContainer<Music>()(MusicList) {}
const link = (music: Music) => `/musics/${music.id}`;

class MusicListPage extends React.Component<Props> {
  musicListContainer = React.createRef<MusicListContainer>();

  render() {
    const { newPlaylist } = this.props.playlistDiff;

    const headerExtra = (
      <Button onClick={this.onAddAllClicked} icon="plus" type="primary">Add all to Playlist</Button>
    );

    return (
      <div className="music-list-page">
        <MusicListContainer
          title="Music"
          onItemClick={this.onItemClick}
          ref={this.musicListContainer}
          checklist={newPlaylist}
          headerExtra={headerExtra}
          search={musicList}
          link={link}
          history={this.props.history}
        />
      </div>
    );
  }

  onItemClick = (music: Music) => {
    const { newPlaylist } = this.props.playlistDiff;

    if (find(newPlaylist, music)) {
      this.props.musicPlaylistRemove(music);
    } else {
      this.props.musicPlaylistAdd([music]);
    }
  }

  onAddAllClicked = () => {
    const query = this.musicListContainer.current!.extractQuery().query;

    musicList(query, 0, 0)
      .then((result) => {
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
    playlistDiff: state.music.playlistDiff,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicListPage);
