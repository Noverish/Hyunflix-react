import React from 'react';
import { connect } from 'react-redux';
import * as APlayer from 'aplayer';

import { Music } from 'models';
import { RootState } from 'reducers';
import 'aplayer/dist/APlayer.min.css';

interface Props {
  playlist: Music[];
  sessionId: string;
}

interface AMusic {
  id: number;
  name: string;
  artist: string;
  url: string;
}

function convert(musics: Music[], sessionId: string): AMusic[] {
  return musics.map(m => ({
    id: m.id,
    name: m.title.includes(' - ') ? m.title.split(' - ')[1] : m.title,
    artist: m.title.includes(' - ') ? m.title.split(' - ')[0] : '',
    url: m.url + `?sessionId=${sessionId}`,
  }));
}

class MusicPlayer extends React.Component<Props> {
  aplayer: APlayer | null = null;

  shouldComponentUpdate(nextProps: Props) {
    const { playlist, sessionId } = nextProps;
    const aplayer = this.aplayer;

    if (aplayer) {
      aplayer.list.clear();

      if (playlist.length) {
        aplayer.list.add(convert(playlist, sessionId));
        aplayer.play();
      }
    }

    return false;
  }

  componentDidMount() {
    const { playlist, sessionId } = this.props;
    const container = document.getElementById('aplayer');

    const aplayer = new APlayer({
      container: container,
      audio: convert(playlist, sessionId),
      autoplay: true,
      loop: 'all',
      order: 'random',
      listFolded: false,
    });

    this.aplayer = aplayer;
  }

  render() {
    return (
      <div id="aplayer" />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  sessionId: state.auth.sessionId,
});

export default connect(mapStateToProps)(MusicPlayer);
