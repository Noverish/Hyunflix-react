import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { ServerResponse, Type } from '../models';
import * as service from '../services';
import { FolderPage, VideoPage } from './sub_pages';

interface Props {
  
}

interface State {
  serverResponse: ServerResponse | null
}

export default class HomePage extends Component<Props, State> {
  constructor(props) {
    super(props);
    
    this.state = {
      serverResponse: null
    }
  }
  
  componentDidMount() {
    const path = this.props['location']['pathname'];
    
    service.get(path)
      .then((res: ServerResponse) => {
        this.setState({
          serverResponse: res
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    const res: ServerResponse | null = this.state.serverResponse;
    
    if (res == null) {
      return (
        <div></div>
      )
    }
    
    switch (res.type) {
      case Type.folder: {
        return (
          <FolderPage { ...res } />
        )
      }
      case Type.video: {
        return (
          <VideoPage { ...res } />
        )
      }
      case Type.image: {
        return (
          <a href={res.payload['rawUrl']}>{ res.payload['rawUrl'] }</a>
        )
      }
      case Type.text: {
        return (
          <a href={res.payload['rawUrl']}>{ res.payload['rawUrl'] }</a>
        )
      }
    }
  }
}
