import React, { useState, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

import { UserVideoList } from 'src/components';
import { UserVideo } from 'src/models';
import { deleteUserVideoBulk, userVideoList } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';

const link = (userVideo: UserVideo) => `/videos/${userVideo.video.id}`;

const UserVideoPage: React.FC<RouteComponentProps> = (props) => {
  const { items, total, loading, query, page, setQuery, setPage, refresh } = useSearch(userVideoList, props.history, PAGE_SIZE);
  const [checkable, setCheckable] = useState(false);
  const [checklist, setChecklist] = useState([] as UserVideo[]);
  const [loading2, setLoading] = useState(false);

  // functions
  const toggleMode = useCallback(() => {
    setCheckable(v => !v);
  }, []);

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

  // components
  const headerExtra = useMemo(() => ((checkable)
    ? (
      <>
        <Button type="danger" onClick={deleteUserVideos} disabled={checklist.length === 0}>삭제</Button>
        <Button onClick={toggleMode}>취소</Button>
      </>
    ) : (
      <Button type="danger" onClick={toggleMode}>삭제</Button>
    )),
  [deleteUserVideos, toggleMode, checklist, checkable]);

  return (
    <UserVideoList
      items={items}
      total={total}
      loading={loading || loading2}

      query={query}
      onQueryChange={setQuery}

      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}

      title="시청 기록"
      link={link}
      headerExtra={headerExtra}

      checklist={checkable ? checklist : undefined}
      onItemClick={checkable ? onItemClick : undefined}
    />
  );
};

export default UserVideoPage;
