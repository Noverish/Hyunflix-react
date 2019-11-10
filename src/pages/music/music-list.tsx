import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { musicPlaylistAdd, musicPlaylistRemove } from 'actions';

import { musicList } from 'api';
import { Music } from 'models';
import { MusicPlayer, MusicList } from 'components';
import withContainer from 'components/hoc/container';
import './music-list.css';

interface Props extends RouteComponentProps {
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicPlaylistRemove: typeof musicPlaylistRemove;
  playlist: Music[];
}

class MusicListContainer extends withContainer<Music>()(MusicList) {}
const link = (music: Music) => `/musics/${music.id}`;

class MusicListPage extends React.Component<Props> {
  musicListContainer = React.createRef<MusicListContainer>();

  render() {
    const { playlist } = this.props;

    const headerExtra = (
      <Button onClick={this.onAddAllClicked} icon="plus" type="primary">Add all to Playlist</Button>
    );

    return (
      <div className="music-list-page">
        <MusicPlayer />
        <MusicListContainer
          title="Music"
          onItemClick={this.onItemClick}
          ref={this.musicListContainer}
          checklist={playlist}
          headerExtra={headerExtra}
          search={musicList}
          link={link}
          history={this.props.history}
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
    playlist: state.music.playlist,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicListPage);
