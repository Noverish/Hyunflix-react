import React from 'react';
import { PageHeader, List, Pagination, Input } from 'antd';
import { connect } from 'react-redux';

import { VideoBundleItem } from 'components';
import { VideoBundle } from 'models';
import { PAGE_SIZE } from 'config';

const { Search } = Input;

interface Props {
  bundles: VideoBundle[];
}

interface State {
  page: number;
}

class VideoArticleList extends React.Component<Props, State> {
  state = {
    page: 1,
  }
  
  componentDidMount() {
    
  }
  
  renderItem = (bundle: VideoBundle) => {
    return (
      <VideoBundleItem
        bundle={bundle}
        link={`/bundles/videos/${bundle.category}/${bundle.bundleId}`}
      />
    )
  }
  
  render() {
    const { bundles } = this.props;
    const { page } = this.state;
    
    const searched = bundles;
    const sliced = searched.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    const title = (bundles.length) ? bundles[0].category : '';
    
    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader backIcon={false} title={title} />
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoArticleList);