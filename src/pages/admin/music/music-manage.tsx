import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';

import { MusicArticleListWrapper } from 'containers';
import { Music } from 'models';

const onClick = ({ key }) => {
  console.log(key);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key={0}>Delete data</Menu.Item>
    <Menu.Item key={1}>Delete data and real file</Menu.Item>
  </Menu>
);

const MusicManagePage: React.FunctionComponent = () => {
  const [checklist, setChecklist] = useState([] as Music[]);

  const topRight = (
    <React.Fragment>
      <Button disabled={checklist.length !== 1}>수정</Button>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="danger" disabled={checklist.length === 0}>삭제</Button>
      </Dropdown>
    </React.Fragment>
  );

  const onItemClick = (music: Music) => {
    const newChecklist = checklist.some(m => m.id === music.id)
      ? checklist.filter(m => m.id !== music.id)
      : [...checklist, music];

    setChecklist(newChecklist);
  };

  const subTitle = `${checklist.length}개 선택됨`;

  return (
    <MusicArticleListWrapper
      topRight={topRight}
      checklist={checklist}
      onItemClick={onItemClick}
      subTitle={subTitle}
    />
  );
};

export default MusicManagePage;
