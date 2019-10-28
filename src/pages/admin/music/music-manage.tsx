import React, { createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';

import { MusicArticleListWrapper } from 'containers';
import { Music } from 'models';
import { musicDelete } from 'api';
import { MusicEditModal } from 'components';

interface State {
  checklist: Music[];
  visible: boolean;
}

class MusicManagePage extends React.Component<RouteComponentProps, State> {
  wrapper = createRef<MusicArticleListWrapper>();

  state: State = {
    checklist: [],
    visible: false,
  };

  render() {
    const { checklist, visible } = this.state;

    const menu = (
      <Menu onClick={this.onDeleteMenuClick}>
        <Menu.Item key="false">Delete data</Menu.Item>
        <Menu.Item key="true">Delete data and real file</Menu.Item>
      </Menu>
    );

    const topRight = (
      <React.Fragment>
        <Button disabled={checklist.length !== 1} onClick={this.onEditClick}>수정</Button>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="danger" disabled={checklist.length === 0}>삭제</Button>
        </Dropdown>
      </React.Fragment>
    );

    const subTitle = `${checklist.length}개 선택됨`;

    return (
      <React.Fragment>
        <MusicArticleListWrapper
          ref={this.wrapper}
          topRight={topRight}
          checklist={checklist}
          onItemClick={this.onItemClick}
          subTitle={subTitle}
        />
        {checklist.length > 0 && <MusicEditModal music={checklist[0]} visible={visible} callback={this.onEditFinish} />}
      </React.Fragment>
    );
  }

  onItemClick = (music: Music) => {
    const { checklist } = this.state;

    const newChecklist = checklist.some(m => m.id === music.id)
      ? checklist.filter(m => m.id !== music.id)
      : [...checklist, music];

    this.setState({ checklist: newChecklist });
  }

  onEditClick = () => {
    this.setState({ visible: true });
  }

  onEditFinish = (music: Partial<Music> | undefined) => {
    this.setState({ visible: false });
    console.log(music);
  }

  onDeleteMenuClick = ({ key }) => {
    const { checklist } = this.state;

    const ids = checklist.map(m => m.id);
    const deleteFile = key === 'true';

    musicDelete(ids, deleteFile)
      .then(() => {
        this.wrapper.current!.refresh();
      })
      .catch(() => {});
  }
}

export default MusicManagePage;
