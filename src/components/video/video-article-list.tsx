import React from 'react';
import { PageHeader, List, Pagination, Input, Spin, Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { videoArticleList, videoSearch, videoTagList } from 'actions';
import { VideoArticleItem } from 'components';
import { VideoArticle } from 'models';
import { PAGE_SIZE } from 'config';

const { Search } = Input;

interface Props extends RouteComponentProps {
  // Redux Props
  videoArticleList(): ReturnType<typeof videoArticleList.request>;
  videoTagList(): ReturnType<typeof videoTagList.request>;
  videoSearch(query: string): ReturnType<typeof videoSearch.request>;
  searched: VideoArticle[];
  loading: boolean;
  
  // TODO Default Props
  checkable?: boolean;
  onEdit?(articles: VideoArticle[]): void;
  onDelete?(articles: VideoArticle[]): void;
}

interface State {
  page: number;
  checklist: VideoArticle[];
}

class VideoArticleList extends React.Component<Props, State> {
  static defaultProps = {
    checkable: false,
    onEdit: () => {},
    onDelete: () => {},
  }
  
  query = '';
  
  state = {
    page: 1,
    checklist: [],
  }
  
  componentDidMount() {
    this.props.videoArticleList();
    this.props.videoTagList();
  }
  
  renderItem = (article: VideoArticle) => {
    const checkable: boolean = this.props.checkable!;
    const checklist: VideoArticle[] = this.state.checklist;
    const { query } = this;
    
    const props = (checkable)
      ? { checkable, onCheck: this.onCheck, checked: checklist.includes(article) }
      : {}
    
    return (
      <VideoArticleItem
        article={article}
        highlight={query}
        {...props}
      />
    )
  }
  
  // TODO https://medium.com/@martin_hotell/react-typescript-and-defaultprops-dilemma-ca7f81c661c7
  // TODO https://github.com/Microsoft/TypeScript/issues/23812
  // TODO https://stackoverflow.com/questions/37282159/default-property-value-in-react-component-using-typescript
  // TODO https://medium.com/@pitapat/typescript-3-0-strict-mode-react-hoc-936d7d9231ea
  render() {
    const { searched, loading, checkable, onEdit, onDelete } = this.props;
    const { page, checklist } = this.state;
    
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader onBack={() => null} title="Video" subTitle="영화, 드라마, 예능" />
          <Search onChange={this.onQueryChange} enterButton />
          { checkable && (
            <Button.Group className="button-group">
              <Button icon="edit" onClick={() => onEdit!(checklist)}>Edit</Button>
              <Button icon="delete" onClick={() => onDelete!(checklist)}>Remove</Button>
            </Button.Group> 
          )}
        </div>
        <Spin spinning={loading} tip="로딩중...">
          <List
            dataSource={sliced}
            renderItem={this.renderItem}
          />
        </Spin>
        <Pagination current={page} total={searched.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
      </div>
    )
  }
  
  onQueryChange = (e) => {
    const query = e.target.value;
    this.props.videoSearch(query);
    this.query = query;
    this.setState({ page: 1 });
  }
  
  onPageChange = (page: number) => {
    this.setState({ page })
  }
  
  onCheck = (article: VideoArticle, checked: boolean) => {
    const { checklist } = this.state;
    
    (checked)
      ? this.setState({ checklist: [ ...checklist, article ] })
      : this.setState({ checklist: checklist.filter(v => v !== article)});
  }
}

let mapDispatchToProps = {
  videoArticleList: videoArticleList.request,
  videoTagList: videoTagList.request,
  videoSearch: videoSearch.request,
}

let mapStateToProps = (state) => {
  return {
    searched: state.video.searched,
    loading: state.video.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideoArticleList));