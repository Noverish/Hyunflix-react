import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Pagination, List } from 'antd';
import * as socketio from 'socket.io-client';
import { List as IList } from 'immutable';

import { MainLayout, EncodeItem } from 'components';
import { Encode } from 'models';
import { encodeStatus, pauseEncoding, resumeEncoding } from 'api';
import './encode.css';

interface Props extends RouteComponentProps {
  
}

interface State {
  encodes: IList<Encode>
  page: number
}

class EncodePage extends React.Component<Props, State> {
  socket: socketio.Socket | null = null;
  
  state = {
    encodes: IList([]),
    page: 1
  }
  
  componentDidMount() {
    this.refresh();
    
    this.socket = socketio.connect("http://home.hyunsub.kim:8080", { path: '/socket.io/api' });
    this.socket.on('message', (data: Buffer) => {
      const payload = JSON.parse(data.toString());
      const encodes = this.state.encodes;
      
      const index = encodes.findIndex((item: Encode) => {
        return item._id === payload['_id'];
      });
      
      if (index >= 0) {
        // TODO ts-ignore
        // @ts-ignore
        const newEncodes = encodes.update(index, (item: Encode) => {
            item.progress = parseFloat(payload['progress'].toFixed(2));
            return item;
          }
        );
        
        this.setState({ encodes: newEncodes })
      }
    });
  }
  
  componentWillUnmount() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }
  
  refresh = () => {
    encodeStatus()
      .then((encodes: Encode[]) => {
        this.setState({ 
          encodes: IList(encodes)
        })
      })
      .catch((msg) => {
        alert(msg);
      })
  }
  
  render() {
    const page = this.state.page;
    const encodes: Encode[] = this.state.encodes.toArray();
    const subItems: Encode[] = encodes.slice((page - 1) * 10, (page) * 10);
    
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
            <Pagination current={page} total={encodes.length} onChange={this.onChange} />
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