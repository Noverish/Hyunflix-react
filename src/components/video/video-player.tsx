import React, { useEffect, useRef } from 'react';
import { SMALL_SEEK_RANGE, VIDEO_SCREEN_RATIO } from 'src/config';
import { Subtitle } from 'src/models';
import videojs from 'video.js';
import 'videojs-landscape-fullscreen';
import 'videojs-seek-buttons';
import './videojs-seek-buttons.css';
import './videojs-skin.css';

const textTractSettings = {
  backgroundColor: '#000',
  backgroundOpacity: '0',
  edgeStyle: 'uniform',
};

interface Props {
  onTimeUpdate?(time: number): void;
  ratio?: number;
  src?: string;
  subtitles?: Subtitle[];
  currentTime?: number;
}

const VideoPlayer = (newProps: Props) => {
  const { onTimeUpdate, ratio, src, subtitles, currentTime } = newProps;

  const playerRef = useRef<videojs.Player>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const onTimeUpdateRef = useRef<() => void>();
  const remoteTextTrackRef = useRef<HTMLTrackElement[]>([]);

  useEffect(() => {
    const player = videojs(videoRef.current, { controls: true });

    // @ts-ignore
    player.landscapeFullscreen();

    // @ts-ignore
    player.seekButtons({
      forward: SMALL_SEEK_RANGE,
      back: SMALL_SEEK_RANGE,
    });

    skin(player);

    // @ts-ignore
    const settings = player.textTrackSettings;
    settings.setValues(textTractSettings);
    settings.updateDisplay();

    playerRef.current = player;

    return () => {
      player.dispose();
    }
  }, []);

  useEffect(() => {
    const player = playerRef.current;

    if (player) {
      if (onTimeUpdateRef.current) {
        player.off('timeupdate', onTimeUpdateRef.current)
      }

      if (onTimeUpdate) {
        const localOnTimeUpdate = () => {
          onTimeUpdate?.(Math.floor(player.currentTime()));
        };
  
        player.on('timeupdate', localOnTimeUpdate);
        onTimeUpdateRef.current = localOnTimeUpdate;
      } else {
        onTimeUpdateRef.current = undefined;
      }
    }
  }, [onTimeUpdate]);

  useEffect(() => {
    const player = playerRef.current;

    if (player) {
      if (src) {
        player.src({ src, type: 'video/mp4' });
      } else {
        player.src();
      }
    }
  }, [src]);

  useEffect(() => {
    const player = playerRef.current;

    if (player) {
      remoteTextTrackRef.current.forEach(v => {
        player.removeRemoteTextTrack(v);
      })

      if (subtitles) {
        const remoteTextTracks = subtitles.map((subtitle) => {
          const option: videojs.TextTrackOptions = {
            kind: 'subtitles',
            srclang: subtitle.language,
            label: subtitle.language,
            src: subtitle.url,
            mode: (subtitle.language === 'default') ? 'showing' : 'hidden',
            default: subtitle.language === 'default',
          };
  
          return player.addRemoteTextTrack(option, true);
        });

        remoteTextTrackRef.current = remoteTextTracks;
      } else {
        remoteTextTrackRef.current = [];
      }
    }
  }, [subtitles]);

  useEffect(() => {
    const player = playerRef.current;

    if (player && currentTime) {
      player.currentTime(currentTime);
    }
  }, [currentTime]);

  const ratio2 = (ratio || VIDEO_SCREEN_RATIO) * 100;

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  return (
    <div style={{ position: 'relative', paddingTop: `${ratio2}%` }}>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
        <div data-vjs-player style={{ width: '100%', height: '100%' }}>
          <video className="video-js" ref={videoRef} />
        </div>
      </div>
    </div>
  );
}

// https://github.com/maluklo/Newskin-videojs-v6-v7
function skin(videojs) {
  videojs.options.controlBar = {
    // @ts-ignore
    volumePanel: { inline: !1, vertical: !0 },
    children: [
      'playToggle',
      'volumePanel',
      'liveDisplay',
      'currentTimeDisplay',
      'progressControl',
      'durationDisplay',
      'chaptersButton',
      'descriptionsButton',
      'subsCapsButton',
      'audioTrackButton',
      'fullscreenToggle',
    ],
  };
}

export default VideoPlayer;
