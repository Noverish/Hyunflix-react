import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Icon } from 'antd';

import { musicRandomPlayToggle, musicLoopPlayToggle } from 'actions';
import { MusicPlayList } from 'components';
import './music-play-modal.css';

interface Props {
  musicRandomPlayToggle(): ReturnType<typeof musicRandomPlayToggle>;
  musicLoopPlayToggle(): ReturnType<typeof musicLoopPlayToggle>;
  randomPlay: boolean;
  loopPlay: number;
  
  visible: boolean;
  dismissCallback(): void;
}

interface State {
  
}

class MusicPlayModal extends React.Component<Props, State> {
  renderLoopBtn = () => {
    const { loopPlay, musicLoopPlayToggle } = this.props;
    
    switch (loopPlay) {
      case 0: return <Button onClick={musicLoopPlayToggle}><Icon type="retweet" />반복 재생 꺼짐</Button>;
      case 1: return <Button onClick={musicLoopPlayToggle} type="primary"><Icon type="retweet" />한 곡만 반복 재생 켜짐</Button>;
      case 2: return <Button onClick={musicLoopPlayToggle} type="primary"><Icon type="retweet" />모든 곡 반복 재생 켜짐</Button>;
      default: return null;
    }
  }
  
  renderRandomBtn = () => {
    const { randomPlay, musicRandomPlayToggle } = this.props;
    
    return (randomPlay)
      ? <Button onClick={musicRandomPlayToggle} type="primary"><Icon type="swap" />랜덤 재생 켜짐</Button>
      : <Button onClick={musicRandomPlayToggle}><Icon type="swap" />랜덤 재생 꺼짐</Button>
  }
  
  render() {
    return (
      <Modal
        className="music-play-modal"
        title="Music Playlist"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Button.Group style={{ marginBottom: '8px' }} >
          { this.renderLoopBtn() }
          { this.renderRandomBtn() }
        </Button.Group>
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

const mapDispatchToProps = {
  musicRandomPlayToggle,
  musicLoopPlayToggle,
}

let mapStateToProps = (state) => {
  return {
    randomPlay: state.music.randomPlay,
    loopPlay: state.music.loopPlay,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayModal);