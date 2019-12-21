import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { useFullscreenStatus } from 'hooks';
import { PageHeader, ComicSwiper } from 'components';
import { getComic, listComicImg } from 'api';
import { Comic } from 'models';
import './comic-content.scss';

interface Props extends RouteComponentProps {
  token: string;
}

const ComicContentPage = (props: Props) => {
  const fullscreenElement = useRef<HTMLDivElement>(null);
  const [isFullscreen, setFullscreen] = useFullscreenStatus(fullscreenElement);
  const [comic, setComic] = useState(null as Comic | null);
  const [urls, setUrls] = useState([] as string[]);
  const [hide, setHide] = useState(false);

  const comicId: number = parseInt(props.match.params['comicId']);
  const token: string = props.token;

  useEffect(() => {
    getComic(comicId)
      .then(setComic)
      .then(() => listComicImg(comicId))
      .then(urls => setUrls(urls.map(v => `${v}?token=${token}`)));
  }, [comicId, token]);

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
        onBack={props.history.goBack}
        extra={fullscreenButton}
        style={{ display: hide ? 'none' : 'block' }}
      />
      <div className="comic-swiper-wrapper" onClick={onClick}>
        <ComicSwiper urls={urls} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(ComicContentPage);
