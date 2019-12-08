import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import find from 'lodash/find';

import { MusicPlaylist } from 'models';

const { TabPane } = Tabs;

interface Props {
  playlists: MusicPlaylist[];
  current?: MusicPlaylist;
  onChange(playlist: MusicPlaylist): void;
  onAdd(): void;
  onDelete(playlist: MusicPlaylist): void;
}

const MusicPlaylistPage = (props: Props) => {
  const { playlists, current, onChange, onAdd, onDelete } = props;

  const _onChange = (key) => {
    onChange(find(playlists, { id: parseInt(key) }));
  };

  const editUrl = current ? `/musics/playlist/${current.id}/edit` : ''; // TODO

  const editButton = (
    <Button.Group>
      <Button onClick={onAdd}>추가</Button>
      <Button disabled={!current}><Link to={editUrl}>수정</Link></Button>
      <Button onClick={onDelete.bind(null, current!)} disabled={!current}>삭제</Button>
    </Button.Group>
  );

  const playlistButtons = playlists.map(v => (
    <TabPane tab={v.title} key={v.id.toString()} closable={true}/>
  ));

  return (
    <Tabs
      hideAdd={true}
      onChange={_onChange}
      activeKey={current ? current.id.toString() : undefined}
      type="card"
      tabBarExtraContent={editButton}
      tabBarStyle={{ margin: '0' }}
    >
      {playlistButtons}
    </Tabs>
  );
};

export default MusicPlaylistPage;
