import React from 'react';
import { Typography } from 'antd';
import { connect } from 'react-redux';

import { musicPlayNextAsync } from 'actions';
import { Music } from 'models';
import { MusicPlayControl } from 'components';

interface Props {
  musicPlayNext(): ReturnType<typeof musicPlayNextAsync.request>;
  playlist: Music[];
  nowPlaying: Music | null;
  randomPlay: boolean;
  loopPlay: number;
  token: string;
}

interface State {

}

class MusicPlayer extends React.Component<Props, State> {
  audioTag: HTMLAudioElement | null = null;

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextProps.nowPlaying !== this.props.nowPlaying;
  }

  render() {
    const { nowPlaying, token } = this.props;

    const source = (nowPlaying)
      ? <source src={encodeURI(nowPlaying!.url) + `?token=${token}`} type="audio/mpeg" />
      : null;

    const title = (nowPlaying)
      ? <Typography.Title style={{ textAlign: 'center' }}>{nowPlaying!.title}</Typography.Title>
      : null;

    return (
      <div className="music-player">
        {title}
        <audio controls={true} autoPlay={true} style={{ width: '100%' }} onEnded={this.onMusicEnded} ref={ref => this.audioTag = ref}>
          {source}
        </audio>
        <MusicPlayControl />
      </div>
    );
  }

  componentDidUpdate() {
    if (this.audioTag) {
      this.audioTag.load();
    }
  }

  onMusicEnded = (e) => {
    this.props.musicPlayNext();
  }
}

const mapDispatchToProps = {
  musicPlayNext: musicPlayNextAsync.request,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.music.playlist,
    nowPlaying: state.music.nowPlaying,
    randomPlay: state.music.randomPlay,
    loopPlay: state.music.loopPlay,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
