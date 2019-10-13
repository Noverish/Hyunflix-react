import React from 'react';

import { PAGE_SIZE } from 'config';
import { VideoArticle } from 'models';
import { videoArticleList } from 'api';

import { VideoArticleList } from 'components';

interface Props extends Partial<React.ComponentProps<typeof VideoArticleList>> {

}

interface State {
  query: string;
  page: number;
  loading: boolean;
  total: number;
  articles: VideoArticle[];
}

class VideoArticleListContainer extends React.Component<Props, State> {
  state = {
    query: '',
    page: 1,
    loading: false,
    total: 0,
    articles: [],
  };

  componentDidMount() {
    const { query, page } = this.state;

    videoArticleList(query, page, PAGE_SIZE)
      .then(r => this.setState({ total: r.total, articles: r.results }));
  }

  render() {
    const { total, articles, page, loading } = this.state;

    return (
      <VideoArticleList
        articles={articles}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={this.onPageChange}
        onQueryChange={this.onQueryChange}
        loading={loading}
        {...this.props}
      />
    );
  }

  onPageChange = (page: number) => {
    const { query } = this.state;
    this.setState({ loading: true });
    videoArticleList(query, page, PAGE_SIZE)
      .then(r => this.setState({ page, total: r.total, articles: r.results, loading: false }));
  }

  onQueryChange = (query: string) => {
    const page = 1;
    this.setState({ loading: true });
    videoArticleList(query, page, PAGE_SIZE)
      .then(r => this.setState({ query, page, total: r.total, articles: r.results, loading: false }));
  }
}

export default VideoArticleListContainer;
