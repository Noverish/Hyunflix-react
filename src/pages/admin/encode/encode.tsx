import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Pagination, List, message, PageHeader, Divider } from 'antd';
import * as socketio from 'socket.io-client';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { encodeList, encodeListSuccess, EncodeListAction, EncodeListSuccessAction } from 'actions';
import { EncodeItem } from 'components';
import { Encode } from 'models';
import { pauseEncoding, resumeEncoding, SERVER } from 'api';
import './encode.css';

interface Props extends RouteComponentProps {
  onEncodeList(): EncodeListAction;
  onEncodeListUpdate(encodes: Encode[]): EncodeListSuccessAction;
  encodes: Encode[]
}

interface State {
  page: number
}

class EncodePage extends React.Component<Props, State> {
  socket: socketio.Socket | null = null;
  
  state = {
    page: 1
  }
  
  componentDidMount() {
    this.props.onEncodeList();
    
    this.socket = socketio.connect(SERVER, { path: '/socket.io/api' });
    this.socket.on('message', (data: Buffer) => {
      const payload = JSON.parse(data.toString());
      const encodes = this.props.encodes;
      
      const index = encodes.findIndex((item: Encode) => {
        return item.encodeId === payload['_id'];
      });
      
      encodes[index].progress = payload['progress'];
      
      this.props.onEncodeListUpdate([...encodes]);
    });
  }
  
  componentWillUnmount() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }
  
  render() {
    const page: number = this.state.page;
    const encodes: Encode[] = this.props.encodes;
    const subItems: Encode[] = encodes.slice((page - 1) * 10, (page) * 10);
    
    return (
      <div className="encode-page-layout">
        <PageHeader onBack={() => null} title="Title" subTitle="This is a subtitle" />
        <Divider style={{ margin: "0" }}/>
        <div className="encode-page-button-bar">
          <Button type="primary" onClick={this.onPauseClicked}>Pause</Button>
          <Button type="primary" onClick={this.onResumeClicked}>Resume</Button>
        </div>
        <div className="encode-page-item-list">
          <List
            dataSource={subItems}
            renderItem={(item: Encode) => (
              <EncodeItem encode={item} key={item.encodeId} />
            )}
          />
        </div>
        <div className="pagination-layout">
          <Pagination current={page} total={encodes.length} onChange={this.onChange} />
        </div>
      </div>
    )
  }
  
  onChange = (page: number) => {
    this.setState({ page })
  }
  
  onPauseClicked = () => {
    pauseEncoding()
      .then(() => {
        message.success('success');
      })
      .catch((msg) => {
        
      })
  }
  
  onResumeClicked = () => {
    resumeEncoding()
      .then(() => {
        message.success('success');
      })
      .catch((msg) => {
        
      })
  }
}

let mapDispatchToProps = (dispatch: Dispatch<EncodeListAction | EncodeListSuccessAction>) => {
  return {
    onEncodeList: () => dispatch(encodeList()),
    onEncodeListUpdate: (encodes) => dispatch(encodeListSuccess(encodes)),
  }
}

let mapStateToProps = (state) => {
  return {
    encodes: state.encode.encodes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EncodePage);