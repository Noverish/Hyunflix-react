import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { musicRandomPlayToggle, musicLoopPlayToggle, musicPlayNextAsync } from 'actions';
import { MusicPlayModal } from 'components';
import './music-play-control.css';

interface Props {
  musicRandomPlayToggle(): ReturnType<typeof musicRandomPlayToggle>;
  musicLoopPlayToggle(): ReturnType<typeof musicLoopPlayToggle>;
  musicPlayNext(): ReturnType<typeof musicPlayNextAsync.request>;
  randomPlay: boolean;
  loopPlay: number;
}

interface State {
  showPlayModal: boolean;
}

class MusicPlayControl extends React.Component<Props, State> {
  state = {
    showPlayModal: false,
  };

  renderLoopBtn = () => {
    const { loopPlay, musicLoopPlayToggle } = this.props;

    switch (loopPlay) {
      case 0: return <Button onClick={musicLoopPlayToggle} size="large"><i className="material-icons">keyboard_tab</i> 반복 재생 안함</Button>;
      case 1: return <Button onClick={musicLoopPlayToggle} size="large"><i className="material-icons">repeat_one</i> 한곡 반복 재생</Button>;
      case 2: return <Button onClick={musicLoopPlayToggle} size="large"><i className="material-icons">repeat</i> 전곡 반복 재생</Button>;
      default: return null;
    }
  }

  renderRandomBtn = () => {
    const { randomPlay, musicRandomPlayToggle } = this.props;

    return (randomPlay)
      ? <Button onClick={musicRandomPlayToggle} size="large"><i className="material-icons">shuffle</i> 랜덤 재생</Button>
      : <Button onClick={musicRandomPlayToggle} size="large"><i className="material-icons">text_rotation_none</i> 순차 재생</Button>;
  }

  render() {
    const { musicPlayNext } = this.props;
    const { showPlayModal } = this.state;

    return (
      <React.Fragment>
        <div className="music-play-control">
          <Button.Group>
            <Button size="large"><i className="material-icons">skip_previous</i>이전 곡</Button>
            <Button size="large" onClick={musicPlayNext}>다음 곡<i className="material-icons">skip_next</i></Button>
          </Button.Group>
          <Button.Group>
            {this.renderLoopBtn()}
            {this.renderRandomBtn()}
            <Button onClick={this.onPlaylistClicked} size="large"><i className="material-icons">queue_music</i> 재생 목록 보기</Button>
          </Button.Group>
        </div>
        <MusicPlayModal visible={showPlayModal} dismissCallback={this.onMusicPlayModalDismiss} />
      </React.Fragment>
    );
  }

  onPlaylistClicked = () => {
    this.setState({ showPlayModal: true });
  }

  onMusicPlayModalDismiss = () => {
    this.setState({ showPlayModal: false });
  }
}

const mapDispatchToProps = {
  musicRandomPlayToggle,
  musicLoopPlayToggle,
  musicPlayNext: musicPlayNextAsync.request,
};

const mapStateToProps = (state) => {
  return {
    randomPlay: state.music.randomPlay,
    loopPlay: state.music.loopPlay,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayControl);
