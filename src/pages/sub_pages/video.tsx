import React from 'react';
import { ServerResponse, Video } from '../../models'
import VideoPlayer from '../../components/VideoPlayer'
import 'video.js/dist/video-js.css'

export default function VideoPage (res: ServerResponse) {
  const video: Video = res.payload as Video;
    
  return (
    <div>
      { <VideoPlayer { ...video } /> }
    </div>
  )
}
