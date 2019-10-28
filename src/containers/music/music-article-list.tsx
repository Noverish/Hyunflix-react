import React from 'react';
import { debounce } from 'debounce';

import { Music } from 'models';
import { MusicArticleList } from 'components';
import { musicList, MusicListResult } from 'api';
import { USER_INPUT_DEBOUNCE, PAGE_SIZE } from 'config';

interface Props {
  onItemClick?(music: Music): void;
  checklist?: Music[];
  topRight?: React.ReactNode;
  title?: string;
  subTitle?: string;
}

interface State {
  musics: Music[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  query: string;
}

class MusicArticleListWrapper extends React.Component<Props, State> {
  state: State = {
    musics: [] as Music[],
    total: 0,
    page: 1,
    pageSize: PAGE_SIZE,
    loading: false,
    query: '',
  };

  link = (music: Music) => `/musics/articles/${music.id}`;

  componentDidMount() {
    const { query, page, pageSize } = this.state;
    this.search(query, page, pageSize);
  }

  render() {
    const { onItemClick, checklist, topRight, title, subTitle } = this.props;
    const { musics, total, page, pageSize, loading } = this.state;

    return (
      <MusicArticleList
        onItemClick={onItemClick}
        checklist={checklist}
        topRight={topRight}
        link={this.link}
        title={title}
        subTitle={subTitle}

        musics={musics}
        total={total}
        page={page}
        pageSize={pageSize}
        loading={loading}

        onPageChange={this.onPageChange}
        onQueryChange={this.onQueryChange}
      />
    );
  }

  debouncedOnQueryChange = debounce((query: string) => {
    const { pageSize } = this.state;
    if (this.state.query !== query) {
      this.search(query, 1, pageSize);
    } else {
      this.setState({ loading: false });
    }
  }, USER_INPUT_DEBOUNCE);

  onQueryChange = (query: string) => {
    this.state.loading || this.setState({ loading: true });
    this.debouncedOnQueryChange(query);
  }

  onPageChange = (page: number) => {
    const { query, pageSize } = this.state;
    this.search(query, page, pageSize);
  }

  refresh = () => {
    const { query, page, pageSize } = this.state;
    this.search(query, page, pageSize);
  }

  search = (query: string, page: number, pageSize: number) => {
    this.setState({ loading: true });

    musicList(query, page, pageSize)
      .then((result: MusicListResult) => {
        this.setState({
          query,
          page,
          pageSize,
          loading: false,
          musics: result.results,
          total: result.total,
        });
      })
      .catch();
  }
}

export default MusicArticleListWrapper;
