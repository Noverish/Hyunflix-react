import React from 'react';
import { PageHeader, List, Pagination, Input } from 'antd';
import { connect } from 'react-redux';

import { VideoSeriesItem } from 'components';
import { VideoSeries } from 'models';
import { PAGE_SIZE } from 'config';

const { Search } = Input;

interface Props {
  serieses: VideoSeries[];
  onBack?(): void;
  title?: string;
  subTitle?: string;
}

interface State {
  page: number;
}

class VideoSeriesList extends React.Component<Props, State> {
  public static defaultProps = {
    title: 'Video Series',
    subTitle: '',
  };

  state = {
    page: 1,
  };

  componentDidMount() {

  }

  renderItem = (series: VideoSeries) => {
    return (
      <VideoSeriesItem
        series={series}
        link={`/series/videos/${series.category}/${series.id}`}
      />
    );
  }

  render() {
    const { serieses, onBack } = this.props;
    const { page } = this.state;
    const title: string = this.props.title || VideoSeriesList.defaultProps.title;
    const subTitle: string = this.props.subTitle || VideoSeriesList.defaultProps.subTitle;

    const searched = serieses;
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);

    const props = (onBack)
      ? { onBack }
      : { backIcon: false };

    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader {...props} title={title} subTitle={subTitle} />
          <Search onChange={this.onQueryChange} enterButton={true} />
        </div>
        <div className="page-content">
          <List
            dataSource={sliced}
            renderItem={this.renderItem}
          />
        </div>
        <div className="page-footer">
          <div className="left wrapper"/>
          <div className="center wrapper">
            <Pagination current={page} total={searched.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
          </div>
          <div className="right wrapper"/>
        </div>
      </div>
    );
  }

  onQueryChange = (e) => {

  }

  onPageChange = (page: number) => {
    this.setState({ page });
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoSeriesList);
