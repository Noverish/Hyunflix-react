import React from 'react';
import { PageHeader, List, Pagination, Input, Spin } from 'antd';
import { debounce } from 'debounce';

import { VideoArticleItem } from 'components';
import { VideoArticle } from 'models';
import { USER_INPUT_DEBOUNCE, PAGE_SIZE } from 'config';

const { Search } = Input;

interface Props {
  onPageChange?(page: number): void;
  onQueryChange?(query: string): void;
  onItemClick?(article: VideoArticle): void;
  onItemCheck?(article: VideoArticle, checked: boolean, checklist: VideoArticle[]): void;
  articles: VideoArticle[];
  total?: number;
  page?: number;
  pageSize?: number;
  loading?: boolean;
  topRight?: React.ReactNode;
  checkable?: boolean;
}

interface State {
  page: number;
  checklist: VideoArticle[];
}

class VideoArticleList extends React.Component<Props, State> {
  query = '';
  
  public static defaultProps = {
    checkable: false,
    loading: false,
    onItemClick: () => {},
    onItemCheck: () => {},
    pageSize: PAGE_SIZE,
  }
  
  state = {
    checklist: [],
    page: this.props.page ? -1 : 1,
  }
  
  renderItem = (article: VideoArticle) => {
    const onItemClick = this.props.onItemClick || VideoArticleList.defaultProps.onItemClick;
    const { query } = this;
    const checkable: boolean = this.props.checkable || VideoArticleList.defaultProps.checkable;
    const checklist: VideoArticle[] = this.state.checklist;
    
    return (
      <VideoArticleItem
        onClick={onItemClick}
        onCheck={this.onItemCheck}
        article={article}
        highlight={query}
        checkable={checkable}
        checked={checklist.some(a => a.articleId === article.articleId)}
      />
    )
  }
  
  render() {
    const { articles, topRight } = this.props;
    const page = this.props.page || this.state.page;
    const loading = this.props.loading || VideoArticleList.defaultProps.loading;
    const pageSize: number = this.props.pageSize || VideoArticleList.defaultProps.pageSize;
    const total: number = this.props.total || articles.length;
    
    const sliced = (this.props.onPageChange)
      ? articles
      : articles.slice((page - 1) * pageSize, (page) * pageSize);
    
    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader backIcon={false} title="Video" subTitle="영화, 드라마, 예능" />
          { this.props.onQueryChange && <Search onChange={this.onQueryChange} enterButton /> }
          { topRight }
        </div>
        <div className="page-content">
          <Spin spinning={loading} tip="로딩중...">
            <List
              dataSource={sliced}
              renderItem={this.renderItem}
            />
          </Spin>
        </div>
        <div className="page-footer">
          <div className="left wrapper"></div>
          <div className="center wrapper">
            <Pagination current={page} total={total} pageSize={pageSize} onChange={this.onPageChange} />
          </div>
          <div className="right wrapper"></div>
        </div>
      </div>
    )
  }
  
  debouncedOnQueryChange = debounce((query: string) => {
    if (this.query !== query) {
      this.query = query;
      this.props.onQueryChange!(query)
    }
  }, USER_INPUT_DEBOUNCE);
  
  onQueryChange = (e) => {
    this.debouncedOnQueryChange(e.target.value)  
  }
  
  onPageChange = (page: number) => {
    const { onPageChange } = this.props;
    
    this.props.page || this.setState({ page });
    if (onPageChange) {
      onPageChange(page);
    }
  }
  
  onItemCheck = (article: VideoArticle, checked: boolean) => {
    const onItemCheck = this.props.onItemCheck || VideoArticleList.defaultProps.onItemCheck;
    const { checklist } = this.state;
    const newChecklist = (checked) ? [ ...checklist, article ] : checklist.filter(v => v !== article)
    
    this.setState({ checklist: newChecklist });
    onItemCheck(article, checked, newChecklist);
  }
}

export default VideoArticleList;
