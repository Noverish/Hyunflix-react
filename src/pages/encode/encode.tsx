import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Pagination, List } from 'antd';

import { MainLayout, EncodeItem } from 'components';
import { Encode } from 'models';
import { encodeStatus, pauseEncoding, resumeEncoding } from 'api';
import './encode.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  encodes: Encode[]
  page: number
}

class EncodePage extends React.Component<Props, State> {
  state = {
    encodes: [],
    page: 1
  }
  
  componentDidMount() {
    this.refresh();
  }
  
  refresh = () => {
    encodeStatus()
      .then((encodes: Encode[]) => {
        this.setState({ encodes })
      })
      .catch((msg) => {
        alert(msg);
      })
  }
  
  render() {
    const page = this.state.page;
    const subItems = this.state.encodes.slice((page - 1) * 10, (page) * 10);
    
    return (
      <MainLayout>
        <div className="encode-page-layout">
          <div className="encode-page-button-bar">
            <Button type="primary" onClick={this.onPauseClicked}>Pause</Button>
            <Button type="primary" onClick={this.onResumeClicked}>Resume</Button>
          </div>
          <div className="encode-page-item-list">
            <List
              dataSource={subItems}
              renderItem={(item: Encode) => (
                <EncodeItem encode={item} key={item._id} />
              )}
            />
          </div>
          <div className="pagination-layout">
            <Pagination current={page} total={this.state.encodes.length} onChange={this.onChange} />
          </div>
        </div>
      </MainLayout>
    )
  }
  
  onChange = (page) => {
    this.setState({ page })
  }
  
  onPauseClicked = () => {
    pauseEncoding()
      .then(() => {
        alert('success');
      })
      .catch((msg) => {
        alert(msg);
      })
  }
  
  onResumeClicked = () => {
    resumeEncoding()
      .then(() => {
        alert('success');
      })
      .catch((msg) => {
        alert(msg);
      })
  }
}

export default EncodePage;