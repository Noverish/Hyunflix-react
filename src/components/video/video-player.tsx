import React from 'react';
import videojs from 'video.js';
import { Subtitle } from 'src/models';
import { LARGE_SEEK_RANGE, SMALL_SEEK_RANGE, VIDEO_SCREEN_RATIO } from 'src/config';
import 'videojs-seek-buttons';
import 'videojs-landscape-fullscreen';
import './videojs-seek-buttons.css';
import './videojs-skin.css';

interface Props {
  onTimeUpdate?(time: number): void;
  ratio?: number;
}

export default class VideoPlayer extends React.Component<Props> {
  player: videojs.Player | null = null;

  videoNode = React.createRef<HTMLVideoElement>();

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    const player = videojs(this.videoNode.current, { controls: true });

    // @ts-ignore
    player.landscapeFullscreen();

    // @ts-ignore
    player.seekButtons({
      forward: SMALL_SEEK_RANGE,
      back: SMALL_SEEK_RANGE,
    });

    skin(player);

    const { onTimeUpdate } = this.props;
    if (onTimeUpdate) {
      player.on('timeupdate', () => {
        onTimeUpdate(Math.floor(player.currentTime()));
      });
    }

    const textTractSettings = {
      backgroundColor: '#000',
      backgroundOpacity: '0',
      edgeStyle: 'uniform',
    };

    // @ts-ignore
    const settings = player.textTrackSettings;
    settings.setValues(textTractSettings);
    settings.updateDisplay();

    this.player = player;
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
    document.removeEventListener('keydown', this.onKeyDown);
  }

  public src = (src: string) => {
    const { player } = this;
    if (player) {
      player.src({ src, type: 'video/mp4' });
    }
  };

  public addSubtitles = (subtitles: Subtitle[]) => {
    const { player } = this;
    if (player) {
      subtitles.forEach((subtitle, index) => {
        const option: videojs.TextTrackOptions = {
          kind: 'subtitles',
          srclang: subtitle.language,
          label: subtitle.language,
          src: subtitle.url,
          mode: (subtitle.language === 'default') ? 'showing' : 'hidden',
          default: subtitle.language === 'default',
        };

        player.addRemoteTextTrack(option, false);
      });
    }
  };

  public setCurrentTime = (currentTime: number) => {
    const { player } = this;
    if (player) {
      player.currentTime(currentTime);
    }
  };

  onKeyDown = (e: KeyboardEvent) => {
    const { player } = this;
    if (e.repeat || !player) {
      return;
    }

    const seekRange = e.ctrlKey ? LARGE_SEEK_RANGE : SMALL_SEEK_RANGE;

    switch (e.key) {
      case ' ': {
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
        break;
      }
      case 'Enter': {
        if (player.isFullscreen()) {
          player.exitFullscreen();
        } else {
          player.requestFullscreen();
        }
        break;
      }
      case 'ArrowLeft': {
        player.currentTime(player.currentTime() - seekRange);
        break;
      }
      case 'ArrowRight': {
        player.currentTime(player.currentTime() + seekRange);
        break;
      }
      default:
        break;
    }
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const ratio = (this.props.ratio || VIDEO_SCREEN_RATIO) * 100;

    return (
      <div style={{ position: 'relative', paddingTop: `${ratio}%` }}>
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
          <div data-vjs-player style={{ width: '100%', height: '100%' }}>
            <video className="video-js" ref={this.videoNode} />
          </div>
        </div>
      </div>
    );
  }
}

// https://github.com/maluklo/Newskin-videojs-v6-v7
function skin(videjs) {
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
