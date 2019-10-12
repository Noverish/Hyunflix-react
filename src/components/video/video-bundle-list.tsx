import React from 'react';
import { PageHeader, List, Pagination, Input } from 'antd';
import { connect } from 'react-redux';

import { VideoBundleItem } from 'components';
import { VideoBundle } from 'models';
import { PAGE_SIZE } from 'config';

const { Search } = Input;

interface Props {
  bundles: VideoBundle[];
  onBack?(): void;
  title?: string;
  subTitle?: string;
}

interface State {
  page: number;
}

class VideoBundleList extends React.Component<Props, State> {
  public static defaultProps = {
    title: 'Video Bundle',
    subTitle: ''
  }
  
  state = {
    page: 1,
  }
  
  componentDidMount() {
    
  }
  
  renderItem = (bundle: VideoBundle) => {
    return (
      <VideoBundleItem
        bundle={bundle}
        link={`/videos/bundles/${bundle.category}/${bundle.id}`}
      />
    )
  }
  
  render() {
    const { bundles, onBack } = this.props;
    const { page } = this.state;
    const title: string = this.props.title || VideoBundleList.defaultProps.title;
    const subTitle: string = this.props.subTitle || VideoBundleList.defaultProps.subTitle;
    
    const searched = bundles;
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    const props = (onBack)
      ? { onBack }
      : { backIcon: false }
    
    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader {...props} title={title} subTitle={subTitle} />
          <Search onChange={this.onQueryChange} enterButton />
        </div>
        <div className="page-content">
          <List
            dataSource={sliced}
            renderItem={this.renderItem}
          />
        </div>
        <div className="page-footer">
          <div className="left wrapper"></div>
          <div className="center wrapper">
            <Pagination current={page} total={searched.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
          </div>
          <div className="right wrapper"></div>
        </div>
      </div>
    )
  }
  
  onQueryChange = (e) => {
    
  }
  
  onPageChange = (page: number) => {
    this.setState({ page })
  }
}

let mapDispatchToProps = {
  
}

let mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoBundleList);