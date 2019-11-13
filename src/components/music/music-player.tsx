import React from 'react';
import { connect } from 'react-redux';
import * as APlayer from 'aplayer';
import { BackTop, Button } from 'antd';
import Dialog from 'rc-dialog/lib/DialogWrap';

import { Music, PlaylistDiff } from 'models';
import 'aplayer/dist/APlayer.min.css';
import 'rc-dialog/assets/index.css';

interface Props {
  playlistDiff: PlaylistDiff;
  token: string;
}

interface AMusic {
  id: number;
  name: string;
  artist: string;
  url: string;
}

interface State {
  mouseX: number;
  mouseY: number;
  showModal: boolean;
}

function convert(musics: Music[], token: string): AMusic[] {
  return musics.map(m => ({
    id: m.id,
    name: m.title.includes(' - ') ? m.title.split(' - ')[1] : m.title,
    artist: m.title.includes(' - ') ? m.title.split(' - ')[0] : '',
    url: m.url + `?token=${token}`,
  }));
}

class MusicPlayer extends React.Component<Props, State> {
  aplayer: APlayer | null = null;

  state: State = {
    mouseX: 0,
    mouseY: 0,
    showModal: false,
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { playlistDiff, token } = nextProps;
    const { newPlaylist, added, removed } = playlistDiff;
    const aplayer = this.aplayer;

    if (aplayer) {
      const oldPlaylist: AMusic[] = aplayer.list.audios;

      // Removed
      if (oldPlaylist.length > newPlaylist.length && removed) {
        const index = oldPlaylist.findIndex(v => v.id === removed.id);
        aplayer.list.remove(index);
      }

      // Added
      if (oldPlaylist.length < newPlaylist.length) {
        aplayer.list.add(convert(added, token));
      }
    }

    return this.state.showModal !== nextState.showModal;
  }

  componentDidUpdate() {
    const { playlistDiff, token } = this.props;
    const { showModal } = this.state;
    const container = document.getElementById('aplayer');
    const aplayer = this.aplayer;

    if (!aplayer && container && showModal) {
      const playlist: AMusic[] = convert(playlistDiff.newPlaylist, token);

      const aplayer = new APlayer({
        container: container,
        audio: playlist,
        autoplay: true,
        loop: 'all',
        order: 'random',
        listMaxHeight: `${window.innerHeight - 400}px`,
      });

      this.aplayer = aplayer;
    }
  }

  render() {
    const { showModal, mouseX, mouseY } = this.state;

    const mousePosition = { x: mouseX, y: mouseY };

    return (
      <React.Fragment>
        <Dialog
          visible={showModal}
          onClose={this.onClose}
          animation="zoom"
          maskAnimation="fade"
          forceRender={true}
          closable={false}
          wrapClassName="music-player-modal"
          keyboard={true}
          mousePosition={mousePosition}
        >
          <div id="aplayer" />
        </Dialog>
        <BackTop className="music-player-floating-button" visibilityHeight={-1} onClick={this.onFloatingBtnClick}>
          <Button type="primary" icon="bars" size="large" />
        </BackTop>
      </React.Fragment>
    );
  }

  onFloatingBtnClick = (e: React.MouseEvent) => {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY,
      showModal: true,
    });
  }

  onClose = () => {
    this.setState({ showModal: false });
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {
  return {
    playlistDiff: state.music.playlistDiff,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
