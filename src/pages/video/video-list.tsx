import React, { useMemo, useCallback, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, List, Pagination } from 'antd';
import { connect } from 'react-redux';

import { PageHeader, VideoItem, TagSelectDropdown } from 'src/components';
import { Video } from 'src/models';
import { videoList } from 'src/api';
import { PAGE_SIZE } from 'src/config';
import { useSearch } from 'src/hooks';
import { RootState } from 'src/reducers';

interface Props extends RouteComponentProps {
  tags: Map<string, string>;
}

const renderItem = (item: Video) => (
  <VideoItem item={item} link={`/videos/${item.id}`} />
);

const VideoListPage = ({ tags, history }: Props) => {
  const { items, total, loading, query, page, setQuery, setPage } = useSearch(videoList, history, PAGE_SIZE);
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

const mapStateToProps = (state: RootState) => ({
  tags: state.video.tags,
});

const connected = connect(mapStateToProps)(VideoListPage);
export default connected;
