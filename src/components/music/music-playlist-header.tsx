import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from 'src/components';
import { MusicPlaylist } from 'src/models';

interface Props {
  current?: MusicPlaylist;
  onAdd(): void;
  onDelete(playlist: MusicPlaylist): void;
}

enum Actions {
  ADD = 'add',
  MODIFY = 'modify',
  DELETE = 'delete',
  MUSIC = 'music',
}

const MusicPlaylistPage = (props: Props) => {
  const history = useHistory();
  const { current, onAdd, onDelete } = props;

  const editUrl = current ? `/musics/playlist/${current.id}/edit` : ''; // TODO
  const musicAddUrl = current ? `/musics/playlist/${current.id}/items` : ''; // TODO

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case Actions.ADD: {
        onAdd();
        break;
      }
      case Actions.MODIFY: {
        history.push(editUrl);
        break;
      }
      case Actions.DELETE: {
        onDelete(current!);
        break;
      }
      case Actions.MUSIC: {
        history.push(musicAddUrl);
        break;
      }
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={Actions.ADD}>
        <PlusOutlined />
        플레이리스트 추가
      </Menu.Item>
      <Menu.Item key={Actions.MODIFY} disabled={!current}>
        <EditOutlined />
        플레이리스트 이름 변경
      </Menu.Item>
      <Menu.Item key={Actions.MUSIC} disabled={!current}>
        <UnorderedListOutlined />
        노래 추가/제거
      </Menu.Item>
      <Menu.Item key={Actions.DELETE} disabled={!current}>
        <DeleteOutlined />
        플레이리스트 삭제
      </Menu.Item>
    </Menu>
  );

  const extra = (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button>
        Actions
        <DownOutlined />
      </Button>
    </Dropdown>
  );

  return (
    <PageHeader
      title="Music Playlist"
      className="border-top border-bottom"
      extra={extra}
      onBack={history.goBack}
    />
  );
};

export default MusicPlaylistPage;
