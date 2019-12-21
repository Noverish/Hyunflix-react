import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import './comic-swiper.scss';

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
    <div key={i} className="swiper-slide">
      <img
        className="swiper-lazy"
        data-src={url}
        alt={''}
      />
      <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
    </div>
  ));

  return (
    <div className="comic-swiper swiper-container">
      <div className="swiper-wrapper">
        {slides}
      </div>
    </div>
  );
};

export default React.memo(ComicSwiper);
