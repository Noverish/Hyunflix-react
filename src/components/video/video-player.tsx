import React from 'react';
import videojs from 'video.js';
import { Subtitle } from 'models';
import 'videojs-seek-buttons';
import './videojs-seek-buttons.css';
import './videojs-skin.css';

interface Props {
  width: number;
  height: number;
  src: string;
  subtitles: Subtitle[];
  onTimeUpdate?(time: number): void;
  currentTime?: number;
}

export default class VideoPlayer extends React.Component<Props> {
  player: videojs.Player | null = null;
  videoNode = React.createRef<HTMLVideoElement>();

  componentDidMount() {
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

  setSrc = (player: videojs.Player, src: string) => {
    player.src({ src, type: 'video/mp4' });
  }

  setSubtitles = (player: videojs.Player, subtitles: Subtitle[]) => {
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

  setCurrentTime = (player: videojs.Player, currentTime: number | undefined) => {
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

    const widthDiff = nextProps.width !== this.props.width;
    const heightDiff = nextProps.height !== this.props.height;

    return widthDiff || heightDiff;
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { width, height } = this.props;

    const style = {
      width: `${width}px`,
      height: `${height}px`,
    };

    return (
      <div data-vjs-player={true} style={style}>
        <video className="video-js" ref={this.videoNode} />
      </div>
    );
  }
}

// TODO https://github.com/maluklo/Newskin-videojs-v6-v7
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
