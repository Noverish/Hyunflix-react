import React from 'react';
import videojs from 'video.js';
import { Video } from '../models'

interface State {
  
}

export default class VideoPlayer extends React.Component<Video, State> {
  captionOption
  videoOption
  player
  videoNode
  
  constructor(props: Video) {
    super(props);
    
    if(props.subtitleUrl) {
      this.captionOption = {
        kind: 'subtitles',
        srclang: 'ko',
        label: 'Korean',
        src: props.subtitleUrl,
        default: true
      };
    }
    
    this.videoOption = {
      autoplay: false,
      controls: true,
      width: this.props.videoWidth,
      height: this.props.videoHeight,
      sources: [{
        src: this.props.videoUrl,
        type: 'video/mp4'
      }]
    }
  }
  
  componentDidMount() {
    this.player = videojs(this.videoNode, this.videoOption, () => {
      if (this.props.subtitleUrl) {
        this.player.addRemoteTextTrack(this.captionOption);
      
        var settings = this.player.textTrackSettings;
        settings.setValues({
            "backgroundColor": "#000",
            "backgroundOpacity": "0",
            "edgeStyle": "uniform",
        });
        settings.updateDisplay();
      }
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div>
    )
  }
}