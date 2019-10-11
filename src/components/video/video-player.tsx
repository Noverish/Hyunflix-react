import React from 'react';
import videojs from 'video.js';
import { Subtitle } from 'models';

interface Props {
  width: number;
  height: number;
  src: string;
  subtitles: Subtitle[];
  onTimeUpdate?(time: number): void;
  currentTime?: number;
}

interface State {
  
}

interface CaptionOption {
  kind: string;
  srclang: string;
  label: string;
  src: string;
  default: boolean;
}

export default class VideoPlayer extends React.Component<Props, State> {
  player: videojs.Player | null = null;
  videoNode: HTMLVideoElement | null = null;
  
  initPlayer = () => {
    const videoOption = {
      autoplay: false,
      controls: true,
      sources: []
    }
    
    this.player = videojs(this.videoNode, videoOption, this.onPlayerReady);
    
    const textTractSettings = {
      "backgroundColor": "#000",
      "backgroundOpacity": "0",
      "edgeStyle": "uniform",
    }
    
    // @ts-ignore
    var settings = this.player!.textTrackSettings;
    settings.setValues(textTractSettings);
    settings.updateDisplay();
  }

  onPlayerReady = () => {
    const { subtitles, src, onTimeUpdate, currentTime } = this.props;
    const player: videojs.Player | null = this.player;
    
    if (player === null) {
      console.warn('onPlayerReady called while player is null!');
      return;
    }
    
    player.src({ src, type: 'video/mp4' });
    
    for(const subtitle of subtitles) {
      player.addRemoteTextTrack({
        kind: 'subtitles',
        srclang: subtitle.language,
        label: subtitle.language,
        src: subtitle.url,
        default: subtitle.language === 'ko'
      }, false /* manualCleanup */);
    }
    
    if (onTimeUpdate) {
      player.off('timeupdate');
      player.on('timeupdate', () => {
        onTimeUpdate(Math.floor(player.currentTime()));
      });
    }
    
    if (currentTime) {
      player.currentTime(currentTime);
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    if (this.player) {
      this.onPlayerReady();
    }
    
    const style = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
    }
    
    return (
      <div data-vjs-player style={style}>
        <video
          ref={node => {
            if(!this.videoNode && node) {
              this.videoNode = node;
              this.initPlayer();
            }
          }}
          className="video-js"
        ></video>
      </div>
    )
  }
}
