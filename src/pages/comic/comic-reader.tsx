import React, { useEffect, useCallback, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Swiper from 'swiper';
import { connect } from 'react-redux';
import { Button, BackTop } from 'antd';

import { useFullscreenStatus } from 'hooks';
import { PageHeader } from 'components';
import 'swiper/css/swiper.min.css';

interface Props extends RouteComponentProps {
  token: string;
}

const imgs = Array.from({ length: 21 }, (_, id) => `http://home.hyunsub.kim:8200/Comics/test/164/${(id + 1).toString().padStart(3, '0')}.jpg`);

const ComicReaderPage = (props: Props) => {
  const fullscreenElement = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useFullscreenStatus(fullscreenElement);

  useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      keyboard: { enabled: true },
      preloadImages: false,
      lazy: { loadPrevNext: true, loadPrevNextAmount: 3 },
    });
  }, []);

  const slides = imgs.map((v, i) => (
    <div key={i} className="swiper-slide" style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        className="swiper-lazy"
        data-src={`${v}?token=${props.token}`}
        style={{ display: 'block', margin: 'auto', maxWidth: '100%', maxHeight: '100%' }}
        alt={v}
      />
      <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
    </div>
  ));

  const fullscreenButton = (
    <Button type="primary" onClick={setIsFullscreen}>전체화면으로 보기</Button>
  );

  const exitFullscreen = useCallback(() => {
    document.exitFullscreen();
  }, []);

  const backtop = (isFullscreen)
    ? (
      <BackTop visibilityHeight={-1} onClick={exitFullscreen}>
        <Button type="primary" icon="close" />
      </BackTop>
    )
    : undefined;

  return (
    <div>
      <PageHeader title="Comic 1" className="border-top border-bottom" onBack={props.history.goBack} extra={fullscreenButton}/>
      <div className="fullscreen" ref={fullscreenElement} style={{ background: 'black' }}>
        <div className="swiper-container" style={{ height: '100%' }}>
          <div className="swiper-wrapper">
            {slides}
          </div>
        </div>
        {backtop}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(ComicReaderPage);
