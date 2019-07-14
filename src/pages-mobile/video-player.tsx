import React from 'react';
import VideoPlayer from '../components-mobile/video-player'
import { get } from '../services';
import { ServerResponse, Video } from '../models'
import 'video.js/dist/video-js.css'

interface Props {
  location;
  history;
}

interface State {
  video: Video | null
}

export default class VideoPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      video: null
    }
  }
  
  componentDidMount() {
    const path = this.props.location.pathname;
    get(path)
      .then((res: ServerResponse) => {
        this.setState({
          video: res.payload as Video
        })
      })
  }
  
  render() {
    if (this.state.video) {
      return (<VideoPlayer { ...this.state.video } />)
    } else {
      return (<div></div>)
    }
  }
}
