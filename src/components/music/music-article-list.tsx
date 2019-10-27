import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, List, Pagination, Input, Button, Spin } from 'antd';

import { MusicArticleItem } from 'components';
import { Music } from 'models';

interface Props {
  musics: Music[];
  onPageChange(page: number): void;
  onQueryChange(query: string): void;
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;

  title?: string;
  subTitle?: string;
  onItemClick?(music: Music): void;
  link?(music: Music): string;
  onBack?(): void;
  checklist?: Music[];
  topRight?: React.ReactNode;
}

type DefaultProps = Pick<Props, 'title'>;
const defaultProps: DefaultProps = {
  title: 'Music',
};

const renderItem = (props: Props, music: Music) => {
  const { checklist, onItemClick, link } = props;

  const checked = (checklist !== undefined)
    ? checklist.some(m => m.id === music.id)
    : undefined;

  return (
    <MusicArticleItem
      music={music}
      onClick={onItemClick}
      link={link}
      checked={checked}
    />
  );
};

const onChange = (props: Props, e: React.ChangeEvent<HTMLInputElement>) => {
  props.onQueryChange(e.target.value);
};

const MusicArticleList: React.FunctionComponent<Props> = function (props) {
  const { musics, loading, onBack, page, pageSize, total, onPageChange, topRight, subTitle } = props;
  const title = props.title || defaultProps.title;

  const pageHeaderProps = (onBack)
      ? { onBack }
      : { backIcon: false };

  const extra = (
    <React.Fragment>
      <Input.Search onChange={onChange.bind(null, props)} enterButton={true} />
      {topRight}
    </React.Fragment>
  );

  return (
    <div className="article-list-page">
      <div className="page-header">
        <PageHeader {...pageHeaderProps} title={title} subTitle={subTitle} extra={extra}/>
      </div>
      <div className="page-content">
        <Spin spinning={loading} tip="로딩중...">
          <List
            dataSource={musics}
            renderItem={renderItem.bind(null, props)}
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

export default MusicArticleList;
