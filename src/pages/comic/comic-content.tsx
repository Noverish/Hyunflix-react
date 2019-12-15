import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, BackTop } from 'antd';

import { useFullscreenStatus } from 'hooks';
import { PageHeader, ComicSwiper } from 'components';
import { getComic, listComicImg } from 'api';
import { Comic } from 'models';

interface Props extends RouteComponentProps {
  token: string;
}

const ComicContentPage = (props: Props) => {
  const fullscreenElement = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useFullscreenStatus(fullscreenElement);
  const [comic, setComic] = useState(null as Comic | null);
  const [urls, setUrls] = useState([] as string[]);

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

  // components
  const fullscreenButton = useMemo(() => (
    <Button type="primary" onClick={setIsFullscreen}>전체화면으로 보기</Button>
  ), [setIsFullscreen]);

  const backtop = useMemo(() => (
    <BackTop visibilityHeight={-1} onClick={exitFullscreen}>
      <Button type="primary" icon="close" />
    </BackTop>
  ), [exitFullscreen]);

  return (
    <div>
      <PageHeader title={comic ? comic.title : ''} className="border-top border-bottom" onBack={props.history.goBack} extra={fullscreenButton}/>
      <div className="fullscreen" ref={fullscreenElement} style={{ background: 'black' }}>
        <ComicSwiper urls={urls} />
        {isFullscreen ? backtop : undefined}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(ComicContentPage);
