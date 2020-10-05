import { Skeleton, Statistic } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { PageHeader, VideoPlayer } from 'src/components';
import { SOCKET_SERVER } from 'src/config';
import { RootActions, RootState } from 'src/features';
import { UserVideoTime } from 'src/models';

const VideoContentPage = (props: RouteComponentProps) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const playerSetting = useSelector((state: RootState) => state.video.player);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const socketRef = useRef<WebSocket>(new WebSocket(SOCKET_SERVER));

  const { video, currentTime, subtitles } = playerSetting;

  useEffect(() => {
    const videoId: number = parseInt(match.params['videoId']);
    dispatch(RootActions.video.player.request(videoId));

    const socket = socketRef.current;
    return () => {
      dispatch(RootActions.video.player.clear());
      socket?.close();
    }
  }, [dispatch, match.params]);

  const onTimeUpdate = useCallback((time: number) => {
    if (video) {
      const userVideoTime: UserVideoTime = {
        token: accessToken,
        videoId: video.id,
        time,
      };
      socketRef.current?.send(JSON.stringify(userVideoTime));
    }
  }, [accessToken, video]);

  const title = (video)
    ? video.title
    : <Skeleton.Button active={true} size="large" style={{ width: '600px' }} />;

  const statistics = useMemo(() => (
    <div className="statistics border-bottom">
      <Statistic title="Durtaion" value={video?.durationString || '0시간 00분'} />
      <Statistic title="Size" value={video?.sizeString || '0.00 GB'} />
      <Statistic title="Screen" value={`${video?.width || '0000'}x${video?.height || '000'}`} />
      <Statistic title="Bitrate" value={video?.bitrateString || '0.00 Mbit/s'} />
      <Statistic title="Resolution" value={video?.resolution || '000p'} />
      <Statistic title="Date" value={video?.date || '오늘'} />
    </div>
  ), [video]);

  return (
    <div className="video-list-page">
      <PageHeader className="border-top" onBack={history.goBack} title={title} />
      <VideoPlayer
        src={video?.url}
        subtitles={video ? subtitles : undefined}
        currentTime={video ? currentTime : undefined}
        onTimeUpdate={video ? onTimeUpdate : undefined}
        ratio={video ? (video.height / video.width) : undefined}
      />
      {statistics}
    </div>
  );
}

export default VideoContentPage;
