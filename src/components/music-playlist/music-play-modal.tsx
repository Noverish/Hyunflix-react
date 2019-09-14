import React from 'react';
import { Modal } from 'antd';

import { MusicPlayList } from 'components';
import './music-play-modal.css';

interface Props {
  visible: boolean;
  dismissCallback(): void;
}

interface State {
  
}

class MusicPlayModal extends React.Component<Props, State> {
  render() {
    return (
      <Modal
        className="music-play-modal"
        title="Music Playlist"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <MusicPlayList />
      </Modal>
    )
  }
  
  onOk = () => {
    this.props.dismissCallback();
  }
  
  onCancel = () => {
    this.props.dismissCallback();
  }
}

export default MusicPlayModal;