import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/features';
import { Music } from 'src/models';

interface Props {
  playlist: Music[];
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
    url: `${m.url}?token=${accessToken}`,
  }));
}

const MusicPlayer = ({ playlist }: Props) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const playerRef = useRef<APlayer>();

  useEffect(() => {
    const container = document.getElementById('aplayer');

    const aplayer = new APlayer({
      container,
      loop: 'all',
      order: 'random',
      listMaxHeight: 0,
    });

    playerRef.current = aplayer;

    return () => {
      aplayer.pause();
    }
  }, []);

  useEffect(() => {
    const player = playerRef.current;

    if (player) {
      player.list.clear();

      if (playlist.length) {
        player.list.add(convert(playlist, accessToken));
        player.play();
      }
    }
  }, [accessToken, playlist]);

  return (
    <div id="aplayer" />
  );
}

export default MusicPlayer;
