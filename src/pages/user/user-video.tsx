import React, { useState, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, List, Pagination } from 'antd';

import { UserVideoItem, PageHeader } from 'src/components';
import { UserVideo } from 'src/models';
import { deleteUserVideoBulk, userVideoList } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const renderHeaderExtra = (
  checkable: boolean,
  checkedNum: number,
  deleteUserVideos: () => void,
  toggleMode: () => void,
) => (
  (checkable)
    ? (
      <>
        <Button type="danger" onClick={deleteUserVideos} disabled={checkedNum === 0}>삭제</Button>
        <Button onClick={toggleMode}>취소</Button>
      </>
    ) : (
      <Button type="danger" onClick={toggleMode}>삭제</Button>
    )
);

const UserVideoPage: React.FC<RouteComponentProps> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage, refresh } = useSearch(userVideoList, props.history, PAGE_SIZE);
  const [checkable, setCheckable] = useState(false);
  const [checklist, setChecklist] = useState([] as UserVideo[]);
  const [loading2, setLoading] = useState(false);

  // functions
  const toggleMode = useCallback(
    () => setCheckable(v => !v),
    [],
  );

  const deleteUserVideos = useCallback(() => {
    const videoIds = checklist.map(v => v.video.id);
    setLoading(true);
    deleteUserVideoBulk(videoIds)
      .then(() => {
        setChecklist([]);
        setLoading(false);
        refresh();
      })
      .catch();
  }, [checklist, refresh]);

  const onItemClick = useCallback((userVideo: UserVideo) => {
    const newChecklist = (checklist.includes(userVideo))
      ? checklist.filter(v => v !== userVideo)
      : [...checklist, userVideo];
    setChecklist(newChecklist);
  }, [checklist]);

  const renderItem = useCallback((item: UserVideo) => (
    <UserVideoItem
      item={item}
      link={`/videos/${item.video.id}`}
      onClick={onItemClick}
      checked={checkable ? checklist.some(v => v.video.id === item.video.id) : undefined}
    />
  ), [checkable, checklist, onItemClick]);

  // components
  const headerExtra = useMemo(
    () => renderHeaderExtra(checkable, checklist.length, deleteUserVideos, toggleMode),
    [deleteUserVideos, toggleMode, checklist, checkable],
  );

  return (
    <div className="list">
      <PageHeader
        title="시청 기록"
        backIcon={false}
        extra={headerExtra}
        query={query}
        onQueryChange={setQuery}
      />
      <List
        dataSource={items}
        renderItem={renderItem}
        loading={loading || loading2}
      />
      <Pagination
        current={page}
        total={total}
        pageSize={PAGE_SIZE}
        onChange={setPage}
      />
    </div>
  );
};

export default UserVideoPage;
