import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Pagination, List, message, PageHeader } from 'antd';
import * as socketio from 'socket.io-client';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { encodeList, encodeListSuccess, EncodeListAction, EncodeListSuccessAction } from 'actions';
import { EncodeItem } from 'components';
import { Encode } from 'models';
import { ffmpegPause, ffmpegResume } from 'api';
import { FFMPEG_SERVER, FFMPEG_SOCKET_PATH, PAGE_SIZE } from 'config';

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
    
    this.socket = socketio.connect(FFMPEG_SERVER, { path: FFMPEG_SOCKET_PATH });
    this.socket.on('message', (data: Buffer) => {
      const payload = JSON.parse(data.toString());
      const encodes = this.props.encodes;
      
      const index = encodes.findIndex((item: Encode) => {
        return item.id === payload['encodeId'];
      });
      
      if (index >= 0) {
        encodes[index].progress = payload['progress'];
        this.props.onEncodeListUpdate([...encodes]);
      }
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
    const subItems: Encode[] = encodes.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader backIcon={false} title="비디오 인코딩" />
          <Button.Group className="button-group">
            <Button icon="caret-right" onClick={this.onResumeClicked}>Resume</Button>
            <Button icon="pause" onClick={this.onPauseClicked}>Pause</Button>
          </Button.Group>
        </div>
        <div className="page-content">
          <List
            dataSource={subItems}
            renderItem={(item: Encode) => (
              <EncodeItem encode={item} key={item.id} />
            )}
          />
        </div>
        <div className="page-footer">
          <div className="left wrapper"></div>
          <div className="center wrapper">
            <Pagination current={page} total={encodes.length} pageSize={PAGE_SIZE} onChange={this.onChange} />
          </div>
          <div className="right wrapper"></div>
        </div>
      </div>
    )
  }
  
  onChange = (page: number) => {
    this.setState({ page })
  }
  
  onPauseClicked = () => {
    ffmpegPause()
      .then(() => {
        message.success('success');
      })
      .catch((msg) => {
        
      })
  }
  
  onResumeClicked = () => {
    ffmpegResume()
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