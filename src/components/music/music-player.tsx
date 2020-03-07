import React from 'react';
import { connect } from 'react-redux';
import * as APlayer from 'aplayer';

import { Music } from 'models';
import { RootState } from 'reducers';
import 'aplayer/dist/APlayer.min.css';

interface Props {
  playlist: Music[];
  accessToken: string;
}

interface AMusic {
  id: number;
  name: string;
  artist: string;
  url: string;
}

function convert(musics: Music[], accessToken: string): AMusic[] {
  return musics.map(m => ({
    id: m.id,
    name: m.title.includes(' - ') ? m.title.split(' - ')[1] : m.title,
    artist: m.title.includes(' - ') ? m.title.split(' - ')[0] : '',
    url: m.url + `?token=${accessToken}`,
  }));
}

class MusicPlayer extends React.Component<Props> {
  aplayer: APlayer | null = null;

  shouldComponentUpdate(nextProps: Props) {
    const { playlist, accessToken } = nextProps;
    const aplayer = this.aplayer;

    if (aplayer) {
      aplayer.list.clear();

      if (playlist.length) {
        aplayer.list.add(convert(playlist, accessToken));
        aplayer.play();
      }
    }

    return false;
  }

  componentDidMount() {
    const { playlist, accessToken } = this.props;
    const container = document.getElementById('aplayer');

    const aplayer = new APlayer({
      container: container,
      audio: convert(playlist, accessToken),
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
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps)(MusicPlayer);
