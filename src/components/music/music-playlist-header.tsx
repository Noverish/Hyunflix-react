import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UnorderedListOutlined, DownOutlined } from '@ant-design/icons';

import { MusicPlaylist } from 'src/models';
import { PageHeader } from 'src/components';

interface Props extends RouteComponentProps {
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
        props.history.push(editUrl);
        break;
      }
      case Actions.DELETE: {
        onDelete(current!);
        break;
      }
      case Actions.MUSIC: {
        props.history.push(musicAddUrl);
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
        현재 플레이리스트 수정
      </Menu.Item>
      <Menu.Item key={Actions.DELETE} disabled={!current}>
        <DeleteOutlined />
        현재 플레이리스트 삭제
      </Menu.Item>
      <Menu.Item key={Actions.MUSIC} disabled={!current}>
        <UnorderedListOutlined />
        플레이리스트 목록 수정
      </Menu.Item>
    </Menu>
  );

  const extra = (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button>
        수정하기
        <DownOutlined />
      </Button>
    </Dropdown>
  );

  return (
    <PageHeader
      title="Music Playlist"
      className="border-top border-bottom"
      extra={extra}
      onBack={props.history.goBack}
    />
  );
};

export default withRouter(MusicPlaylistPage);
