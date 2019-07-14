import React from 'react';

import VideoPlayerComp from 'components/video-player';
import { Video } from 'models';
import { get } from 'services';

interface Props {
  path: string;
}

interface State {
  path: string
  video: Video | null;
}

export default class VideoPlayer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      path: props.path,
      video: null
    }
  }
  
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.path !== prevState.path) {
      return { path: nextProps.path, video: null }
    } else {
      return {}
    }
  }
  
  fetch(path: string) {
    get(path)
      .then((res) => {
        this.setState({
          video: res.payload as Video
        })
      });
  }
  
  render() {
    if (this.state.video === null) {
      this.fetch(this.state.path);
      return (
        <div></div>
      )
    } else {
      return (
        <VideoPlayerComp {...this.state.video} />
      )
    }
  }
}
