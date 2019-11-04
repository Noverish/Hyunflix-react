import React from 'react';

import { PAGE_SIZE } from 'config';
import { Video } from 'models';
import { videoList } from 'api';

import { VideoList } from 'components';

interface Props extends Partial<React.ComponentProps<typeof VideoList>> {

}

interface State {
  query: string;
  page: number;
  loading: boolean;
  total: number;
  videos: Video[];
}

class VideoListWrapper extends React.Component<Props, State> {
  state = {
    query: '',
    page: 1,
    loading: false,
    total: 0,
    videos: [],
  };

  componentDidMount() {
    const { query, page } = this.state;

    videoList(query, page, PAGE_SIZE)
      .then(r => this.setState({ total: r.total, videos: r.results }));
  }

  render() {
    const { total, videos, page, loading } = this.state;

    return (
      <VideoList
        videos={videos}
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
    videoList(query, page, PAGE_SIZE)
      .then(r => this.setState({ page, total: r.total, videos: r.results, loading: false }));
  }

  onQueryChange = (query: string) => {
    const page = 1;
    this.setState({ loading: true });
    videoList(query, page, PAGE_SIZE)
      .then(r => this.setState({ query, page, total: r.total, videos: r.results, loading: false }));
  }
}

export default VideoListWrapper;
