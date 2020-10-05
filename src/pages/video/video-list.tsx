import { Button, List, Pagination } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { videoList } from 'src/api';
import { PageHeader, TagSelectDropdown, VideoItem } from 'src/components';
import { PAGE_SIZE } from 'src/config';
import { RootState } from 'src/features';
import { useSearch } from 'src/hooks';
import { Video } from 'src/models';

const renderItem = (item: Video) => (
  <VideoItem item={item} link={`/videos/${item.id}`} />
);

const VideoListPage = (props: RouteComponentProps) => {
  const tags = useSelector((state: RootState) => state.video.tags);
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(videoList, props.history, PAGE_SIZE);
  const [selectedTag, setSelectedTag] = useState(undefined as string | undefined);

  const onChange = useCallback((tag?: string) => {
    setSelectedTag(tag);
  }, []);

  const headerExtra = useMemo(() => (
    <>
      <TagSelectDropdown tags={tags} onChange={onChange} value={selectedTag} />
      <Link to="/videos/series">
        <Button type="primary">시리즈 별로 보기</Button>
      </Link>
    </>
  ), [tags, onChange, selectedTag]);

  return (
    <div className="list">
      <PageHeader
        title="동영상"
        backIcon={false}
        extra={headerExtra}
        query={query}
        onQueryChange={setQuery}
      />
      <List
        dataSource={items}
        renderItem={renderItem}
        loading={loading}
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

export default VideoListPage;
