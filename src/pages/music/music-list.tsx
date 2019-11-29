import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import find from 'lodash/find';

import { musicPlaylistAdd, musicPlaylistRemove } from 'actions';

import { musicList } from 'api';
import { Music, PlaylistDiff } from 'models';
import { MusicList } from 'components';
import { PAGE_SIZE } from 'config';
import { useSearch } from 'hooks';

interface Props extends RouteComponentProps {
  musicPlaylistAdd(musics: Music[]): ReturnType<typeof musicPlaylistAdd>;
  musicPlaylistRemove: typeof musicPlaylistRemove;
  playlistDiff: PlaylistDiff;
}

const link = (music: Music) => `/musics/${music.id}`;

const MusicListPage: React.FC<Props> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(musicList, props.history, PAGE_SIZE);
  const { newPlaylist } = props.playlistDiff;
  const { musicPlaylistRemove, musicPlaylistAdd } = props;

  // functions
  const onItemClick = useCallback((music: Music) => {
    if (find(newPlaylist, music)) {
      musicPlaylistRemove(music);
    } else {
      musicPlaylistAdd([music]);
    }
  }, [newPlaylist, musicPlaylistRemove, musicPlaylistAdd]);

  const onAddAllClicked = useCallback(() => {
    musicList(query, 0, 0)
      .then((result) => {
        musicPlaylistAdd(result.results);
      })
      .catch();
  }, [musicPlaylistAdd, query]);

  // components
  const headerExtra = useMemo(() => (
    <Button onClick={onAddAllClicked} icon="plus" type="primary">Add all to Playlist</Button>
  ), [onAddAllClicked]);

  return (
    <MusicList
      items={items}
      total={total}
      loading={loading}

      query={query}
      onQueryChange={setQuery}

      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}

      title="Music"
      link={link}
      headerExtra={headerExtra}

      checklist={newPlaylist}
      onItemClick={onItemClick}
    />
  );
};

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
