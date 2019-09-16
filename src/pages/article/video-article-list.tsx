import React from 'react';
import { PageHeader, List, Pagination, Input } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as hangul from 'hangul-js';

import { videoArticleList, VideoArticleListAction } from 'actions';
import { MainLayout, VideoArticleItem } from 'components';
import { VideoArticle } from 'models';
import { PAGE_SIZE } from 'config';
import './article.css';

const { Search } = Input;

interface Props extends RouteComponentProps {
  onVideoArticleList(): VideoArticleListAction;
  articles: VideoArticle[];
}

interface State {
  query: string;
  page: number;
}

class VideoArticleListPage extends React.Component<Props, State> {
  state = {
    query: '',
    page: 1,
  }
  
  componentDidMount() {
    this.props.onVideoArticleList();
  }
  
  render() {
    const { articles } = this.props;
    const { page, query } = this.state;
    
    const searcher = new hangul.Searcher(query);
    const searched = (query) ? articles.filter(a => searcher.search(a.title) >= 0) : articles;
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <MainLayout>
        <div className="article-list-page">
          <div className="page-header">
            <PageHeader onBack={() => null} title="Video" subTitle="영화, 드라마, 예능" />
            <Search onChange={this.onQueryChange} enterButton />
          </div>
          <List
            dataSource={sliced}
            renderItem={article => <VideoArticleItem article={article} highlight={query} />}
          />
          <Pagination current={page} total={searched.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
        </div>
      </MainLayout>
    )
  }
  
  onQueryChange = (e) => {
    this.setState({ query: e.target.value, page: 1 });
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