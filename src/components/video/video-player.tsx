import React from 'react';
import videojs from 'video.js';
import { Subtitle } from 'models';
import { LARGE_SEEK_RANGE, SMALL_SEEK_RANGE } from 'config';
import 'videojs-seek-buttons';
import './videojs-seek-buttons.css';
import './videojs-skin.css';

interface Props {
  src?: string;
  subtitles?: Subtitle[];
  onTimeUpdate?(time: number): void;
  currentTime?: number;
  ratio?: number;
}

export default class VideoPlayer extends React.Component<Props> {
  player: videojs.Player | null = null;
  videoNode = React.createRef<HTMLVideoElement>();

  onKeyDown = (e: KeyboardEvent) => {
    const player = this.player;
    if (e.repeat || !player) {
      return;
    }

    const seekRange = e.ctrlKey ? LARGE_SEEK_RANGE : SMALL_SEEK_RANGE;

    switch (e.key) {
      case ' ': {
        player.paused() ? player.play() : player.pause();
        break;
      }
      case 'Enter': {
        player.isFullscreen() ? player.exitFullscreen() : player.requestFullscreen();
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
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    const videoOption = {
      autoplay: false,
      controls: true,
      sources: [],
    };

    const textTractSettings = {
      backgroundColor: '#000',
      backgroundOpacity: '0',
      edgeStyle: 'uniform',
    };

    const player = videojs(this.videoNode.current, videoOption, this.onPlayerReady);

    // @ts-ignore
    player.seekButtons({
      forward: 10,
      back: 10,
    });

    skin(player);

    const { onTimeUpdate } = this.props;
    if (onTimeUpdate) {
      player.on('timeupdate', () => {
        onTimeUpdate(Math.floor(player.currentTime()));
      });
    }

    // @ts-ignore
    const settings = player.textTrackSettings;
    settings.setValues(textTractSettings);
    settings.updateDisplay();

    this.player = player;
  }

  onPlayerReady = () => {
    const player = this.player!;
    this.setSrc(player, this.props.src);
    this.setSubtitles(player, this.props.subtitles);
    this.setCurrentTime(player, this.props.currentTime);
  }

  setSrc = (player: videojs.Player, src?: string) => {
    if (src) {
      player.src({ src, type: 'video/mp4' });
    } else {
      player.src();
    }
  }

  setSubtitles = (player: videojs.Player, subtitles?: Subtitle[]) => {
    if (!subtitles) {
      return;
    }

    for (const subtitle of subtitles) {
      const option: videojs.TextTrackOptions = {
        kind: 'subtitles',
        srclang: subtitle.language,
        label: subtitle.language,
        src: subtitle.url,
        mode: (subtitle.language === 'ko') ? 'showing' : 'hidden',
        default: subtitle.language === 'ko',
      };

      player.addRemoteTextTrack(option, false);
    }
  }

  setCurrentTime = (player: videojs.Player, currentTime?: number) => {
    if (currentTime) {
      player.currentTime(currentTime);
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    const player = this.player;
    if (player) {
      if (nextProps.src !== this.props.src) {
        this.setSrc(player, nextProps.src);
      }

      if (nextProps.subtitles !== this.props.subtitles) {
        this.setSubtitles(player, nextProps.subtitles);
      }

      if (nextProps.currentTime !== this.props.currentTime) {
        this.setCurrentTime(player, nextProps.currentTime);
      }
    }

    return nextProps.ratio !== this.props.ratio;
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
    document.removeEventListener('keydown', this.onKeyDown);
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const ratio = this.props.ratio || (9 / 16 * 100);

    return (
      <div style={{ position: 'relative', paddingTop: `${ratio}%` }}>
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
          <div data-vjs-player={true} style={{ width: '100%', height: '100%' }}>
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
