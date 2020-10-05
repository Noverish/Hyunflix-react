import { Button } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getComic, listComicImg } from 'src/api';
import { ComicSwiper, PageHeader } from 'src/components';
import { useFullscreenStatus } from 'src/hooks';
import { Comic } from 'src/models';
import { RootState } from 'src/features';
import './comic-content.scss';

const ComicContentPage = (props: RouteComponentProps) => {
  const { history, match } = props;
  const fullscreenElement = useRef<HTMLDivElement>(null);
  const [isFullscreen, setFullscreen] = useFullscreenStatus(fullscreenElement);
  const [comic, setComic] = useState(null as Comic | null);
  const [urls, setUrls] = useState([] as string[]);
  const [hide, setHide] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const comicId: number = parseInt(match.params['comicId']);

  useEffect(() => {
    getComic(comicId)
      .then(setComic)
      .then(() => listComicImg(comicId))
      .then(urls => setUrls(urls.map(v => `${v}?token=${accessToken}`)));
  }, [comicId, accessToken]);

  // functions
  const exitFullscreen = useCallback(() => {
    document.exitFullscreen();
  }, []);

  const onClick = useCallback(() => {
    setHide(v => !v);
  }, []);

  // components
  const fullscreenButton = useMemo(() => (
    isFullscreen
      ? (<Button type="primary" onClick={exitFullscreen}>전체화면에서 나가기</Button>)
      : (<Button type="primary" onClick={setFullscreen}>전체화면으로 보기</Button>)
  ), [isFullscreen, setFullscreen, exitFullscreen]);

  return (
    <div className="comic-content-page" ref={fullscreenElement}>
      <PageHeader
        className="border-top border-bottom"
        title={comic ? comic.title : ''}
        onBack={history.goBack}
        extra={fullscreenButton}
        style={{ display: hide ? 'none' : 'block' }}
      />
      <div className="comic-swiper-wrapper" onClick={onClick}>
        <ComicSwiper urls={urls} />
      </div>
    </div>
  );
};

export default ComicContentPage;
