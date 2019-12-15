import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

interface Props {
  urls: string[];
}

let swiper: Swiper | null = null;

const ComicSwiper = (props: Props) => {
  const { urls } = props;

  useEffect(() => {
    swiper && swiper.destroy(false, true);

    swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      keyboard: { enabled: true },
      preloadImages: false,
      lazy: { loadPrevNext: true, loadPrevNextAmount: 3 },
    });
  }, [urls]);

  const slides = urls.map((url, i) => (
    <div key={i} className="swiper-slide" style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        className="swiper-lazy"
        data-src={url}
        style={{ display: 'block', margin: 'auto', maxWidth: '100%', maxHeight: '100%' }}
        alt={''}
      />
      <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
    </div>
  ));

  return (
    <div className="swiper-container" style={{ height: '100%' }}>
      <div className="swiper-wrapper">
        {slides}
      </div>
    </div>
  );
};

export default React.memo(ComicSwiper);
