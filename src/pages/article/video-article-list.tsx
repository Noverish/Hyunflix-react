import React from 'react';
import { PageHeader, List, Pagination } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { videoArticleList, VideoArticleListAction } from 'actions';
import { MainLayout, VideoArticleItem } from 'components';
import { VideoArticle } from 'models';
import { PAGE_SIZE } from 'config';
import './article.css';

interface Props extends RouteComponentProps {
  onVideoArticleList(): VideoArticleListAction;
  articles: VideoArticle[]
}

interface State {
  page: number
}

class VideoArticleListPage extends React.Component<Props, State> {
  state = {
    page: 1
  }
  
  componentDidMount() {
    this.props.onVideoArticleList();
  }
  
  render() {
    const { articles } = this.props;
    const { page } = this.state;
    
    const sliced = articles.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <MainLayout>
        <div className="article-list-page">
          <PageHeader onBack={() => null} title="Video" subTitle="영화, 드라마, 예능" />
          <List
            dataSource={sliced}
            renderItem={article => <VideoArticleItem article={article}/>}
          />
          <Pagination className="pagenation" current={page} total={articles.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
        </div>
      </MainLayout>
    )
  }
  
  onPageChange = (page: number) => {
    this.setState({ page })
  }
}

let mapDispatchToProps = (dispatch: Dispatch<VideoArticleListAction>) => {
  return {
    onVideoArticleList: () => dispatch(videoArticleList()),
  }
}

let mapStateToProps = (state) => {
  return {
    articles: state.video.articles,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideoArticleListPage));