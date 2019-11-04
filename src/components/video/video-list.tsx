import React from 'react';
import { PageHeader, List, Pagination, Input, Spin } from 'antd';
import { debounce } from 'debounce';
import { connect } from 'react-redux';

import { VideoItem } from 'components';
import { Video } from 'models';
import { USER_INPUT_DEBOUNCE, PAGE_SIZE } from 'config';

const { Search } = Input;

interface Props {
  onPageChange?(page: number): void;
  onQueryChange?(query: string): void;
  onItemClick?(video: Video): void;
  onItemCheck?(video: Video, checked: boolean, checklist: Video[]): void;
  onBack?(): void;
  videos: Video[];
  total?: number;
  page?: number;
  pageSize?: number;
  loading?: boolean;
  topRight?: React.ReactNode;
  checkable?: boolean;
  title?: string;
  subTitle?: string;

  // Redux Props
  tags: Map<string, string>;
}

interface State {
  page: number;
  checklist: Video[];
}

class VideoList extends React.Component<Props, State> {
  query = '';

  public static defaultProps = {
    checkable: false,
    loading: false,
    onItemClick: () => {},
    onItemCheck: () => {},
    pageSize: PAGE_SIZE,
    title: 'Video',
    subTitle: '',
  };

  state = {
    checklist: [],
    page: this.props.page ? -1 : 1,
  };

  renderItem = (video: Video) => {
    const onItemClick = this.props.onItemClick || VideoList.defaultProps.onItemClick;
    const { query } = this;
    const checkable: boolean = this.props.checkable || VideoList.defaultProps.checkable;
    const checklist: Video[] = this.state.checklist;

    return (
      <VideoItem
        onClick={onItemClick}
        onCheck={this.onItemCheck}
        video={video}
        highlight={query}
        checkable={checkable}
        checked={checklist.some(a => a.id === video.id)}
      />
    );
  }

  render() {
    const { videos, topRight, onBack } = this.props;
    const page = this.props.page || this.state.page;
    const loading = this.props.loading || VideoList.defaultProps.loading;
    const pageSize: number = this.props.pageSize || VideoList.defaultProps.pageSize;
    const total: number = this.props.total || videos.length;
    const title: string = this.props.title || VideoList.defaultProps.title;
    const subTitle: string = this.props.subTitle || VideoList.defaultProps.subTitle;

    const sliced = (this.props.onPageChange)
      ? videos
      : videos.slice((page - 1) * pageSize, (page) * pageSize);

    const props = (onBack)
      ? { onBack }
      : { backIcon: false };

    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader {...props} title={title} subTitle={subTitle} />
          {this.props.onQueryChange && <Search onChange={this.onQueryChange} enterButton={true} />}
          {topRight}
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
          <div className="left wrapper"/>
          <div className="center wrapper">
            <Pagination current={page} total={total} pageSize={pageSize} onChange={this.onPageChange} />
          </div>
          <div className="right wrapper"/>
        </div>
      </div>
    );
  }

  debouncedOnQueryChange = debounce((query: string) => {
    if (this.query !== query) {
      this.query = query;
      this.props.onQueryChange!(query);
    }
  },                                USER_INPUT_DEBOUNCE);

  onQueryChange = (e) => {
    this.debouncedOnQueryChange(e.target.value);
  }

  onPageChange = (page: number) => {
    const { onPageChange } = this.props;

    this.props.page || this.setState({ page });
    if (onPageChange) {
      onPageChange(page);
    }
  }

  onItemCheck = (video: Video, checked: boolean) => {
    const onItemCheck = this.props.onItemCheck || VideoList.defaultProps.onItemCheck;
    const { checklist } = this.state;
    const newChecklist = (checked) ? [...checklist, video] : checklist.filter(v => v !== video);

    this.setState({ checklist: newChecklist });
    onItemCheck(video, checked, newChecklist);
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.video.tags,
  };
};

export default connect(mapStateToProps)(VideoList);
