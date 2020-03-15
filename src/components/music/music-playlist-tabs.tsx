import React from 'react';
import { Tabs } from 'antd';
import find from 'lodash/find';

import { MusicPlaylist } from 'src/models';

const { TabPane } = Tabs;

interface Props {
  playlists: MusicPlaylist[];
  current?: MusicPlaylist;
  onChange(playlist: MusicPlaylist): void;
}

const MusicPlaylistPage = (props: Props) => {
  const { playlists, current, onChange: onChangeProps } = props;

  const onChange = (key) => {
    onChangeProps(find(playlists, { id: parseInt(key) }));
  };

  const playlistButtons = playlists.map(v => (
    <TabPane tab={v.title} key={v.id.toString()} closable />
  ));

  return (
    <Tabs
      hideAdd
      onChange={onChange}
      activeKey={current ? current.id.toString() : undefined}
      type="line"
      tabBarStyle={{ margin: '0' }}
    >
      {playlistButtons}
    </Tabs>
  );
};

export default MusicPlaylistPage;
