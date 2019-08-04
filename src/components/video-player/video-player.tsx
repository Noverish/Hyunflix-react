import React from 'react';
import videojs from 'video.js';
import { MovieDetail } from 'models';

interface Props {
  movieDetail: MovieDetail
  width: number
  height: number
  resolution: number
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

interface VideoSrc {
  src: string;
  type: string;
  label: string;
  res: number;
}

export default class VideoPlayer extends React.Component<Props, State> {
  captionOptions: CaptionOption[] = [];
  player;
  videoNode;
  
  constructor(props: Props) {
    super(props);
    
    for(const subtitle of this.props.movieDetail.subtitles) {
      this.captionOptions.push({
        kind: 'subtitles',
        srclang: subtitle.language,
        label: subtitle.language,
        src: subtitle.src,
        default: subtitle.language === 'ko'
      })
    }
  }
  
  componentDidMount() {
    this.refresh()
  }
  
  componentDidUpdate() {
    this.refresh();
  }
  
  refresh() {
    const videoOption = {
      autoplay: false,
      controls: true,
      sources: [{ src: '', type: ''}]
    }
    
    for(const video of this.props.movieDetail.videos) {
      if(this.props.resolution === video.resolution) {
        videoOption.sources[0] = {
          src: video.src,
          type: 'video/mp4'
        }
      }
    }
    
    if(this.player) {
      if(this.player.currentSrc() !== videoOption.sources[0].src) {
        this.player.src(videoOption.sources[0]);
        this.onPlayerReady();
      }
    } else {
      this.player = videojs(this.videoNode, videoOption, this.onPlayerReady);
    }
  }

  onPlayerReady = () => {
    for(const option of this.captionOptions) {
      this.player.addRemoteTextTrack(option, false);
    }
    
    const textTractSettings = {
      "backgroundColor": "#000",
      "backgroundOpacity": "0",
      "edgeStyle": "uniform",
    }
    
    var settings = this.player.textTrackSettings;
    settings.setValues(textTractSettings);
    settings.updateDisplay();
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
    const style = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      maxWidth: '1280px',
      maxHeight: '720px'
    }
    
    return (
      <div data-vjs-player style={style}>
        <video
          ref={ node => this.videoNode = node }
          className="video-js"
        ></video>
      </div>
    )
  }
}