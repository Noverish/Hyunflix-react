import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, List, Pagination, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';

import { musicTagListAsync } from 'actions';
import { MusicArticleItem } from 'components';
import { Music } from 'models';

const { Search } = Input;

interface Props {
  onPageChange(page: number): void;
  onQueryChange(query: string): void;
  onItemClick(music: Music): void;
  onBack?(): void;
  musics: Music[];
  checklist: Music[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  topRight?: React.ReactNode;

  // redux
  musicTagList(): ReturnType<typeof musicTagListAsync.request>;
  tags: Map<string, string>;
}

const renderItem = (props: Props, music: Music) => {
  const { checklist, onItemClick } = props;
  const checked = checklist.some(m => m.id === music.id);

  return (
    <MusicArticleItem
      music={music}
      onClick={onItemClick}
      checked={checked}
    />
  );
};

const MusicArticleList: React.FunctionComponent<Props> = function (props) {
  const { musics, loading, onBack, page, pageSize, total, onPageChange, topRight, onQueryChange, tags, musicTagList } = props;

  useEffect(() => {
    if (!tags.size) {
      musicTagList();
    }
  }, [tags, musicTagList]);

  const pageHeaderProps = (onBack)
      ? { onBack }
      : { backIcon: false };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <div className="article-list-page">
      <div className="page-header">
        <PageHeader {...pageHeaderProps} title="Music" subTitle="가요, 팝송, BGM" />
        <Search onChange={onChange} enterButton={true} />
        {topRight}
      </div>
      <div className="page-content">
        <Spin spinning={loading} tip="로딩중...">
          <List
            dataSource={musics}
            renderItem={music => renderItem(props, music)}
          />
        </Spin>
      </div>
      <div className="page-footer">
        <div className="left wrapper">
          <Button><Link to="/musics/articles/add">음악 추가</Link></Button>
        </div>
        <div className="center wrapper">
          <Pagination current={page} total={total} pageSize={pageSize} onChange={onPageChange} />
        </div>
        <div className="right wrapper"/>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tags: state.music.tags,
});

const mapDispatchToProps = {
  musicTagList: musicTagListAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicArticleList);
