import React from 'react';
import { PageHeader, List, Pagination, Input, Spin, Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { videoArticleList, videoSearch, videoTagList } from 'actions';
import { MainLayout, VideoArticleItem, VideoEditModal } from 'components';
import { VideoArticle } from 'models';
import { PAGE_SIZE } from 'config';
import './article.css';

const { Search } = Input;

interface Props extends RouteComponentProps {
  videoArticleList(): ReturnType<typeof videoArticleList.request>;
  videoTagList(): ReturnType<typeof videoTagList.request>;
  videoSearch(query: string): ReturnType<typeof videoSearch.request>;
  searched: VideoArticle[];
  loading: boolean;
  isAdmin: boolean;
}

interface State {
  videoEditModalVisible: boolean;
  page: number;
}

class VideoArticleListPage extends React.Component<Props, State> {
  query = '';
  
  state = {
    videoEditModalVisible: false,
    article: null,
    page: 1,
  }
  
  componentDidMount() {
    this.props.videoArticleList();
    this.props.videoTagList();
  }
  
  render() {
    const { searched, loading, isAdmin } = this.props;
    const { page, videoEditModalVisible } = this.state;
    const { query } = this;
    
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <MainLayout>
        <div className="article-list-page">
          <div className="page-header">
            <PageHeader onBack={() => null} title="Video" subTitle="영화, 드라마, 예능" />
            <Search onChange={this.onQueryChange} enterButton />
            { (isAdmin) ? (
              <Button.Group className="button-group">
                <Button onClick={this.onEditClicked} icon="edit" type="primary">게시물 수정</Button>
              </Button.Group>
            ) : null }
          </div>
          <Spin spinning={loading} tip="로딩중...">
            <List
              dataSource={sliced}
              renderItem={article => <VideoArticleItem article={article} highlight={query} />}
            />
          </Spin>
          <Pagination current={page} total={searched.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
        </div>
        <VideoEditModal visible={videoEditModalVisible} onClose={this.onModalClose} />
      </MainLayout>
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
  
  onEditClicked = () => {
    this.setState({ videoEditModalVisible: true });
  }
  
  onModalClose = () => {
    this.setState({ videoEditModalVisible: false });
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
    isAdmin: state.auth.isAdmin,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideoArticleListPage));