import { useState, useLayoutEffect } from 'react';

// from https://github.com/Darth-Knoppix/example-react-fullscreen
export default function useFullscreenStatus(elRef): [boolean, () => void] {
  const [isFullscreen, setIsFullscreen] = useState(
    document[getBrowserFullscreenElementProp()] != null,
  );

  const setFullscreen = () => {
    if (elRef.current == null) return;

    elRef.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  };

  useLayoutEffect(() => {
    document.onfullscreenchange = () => setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

    return () => {
      document.onfullscreenchange = null;
      return undefined;
    };
  });

  return [isFullscreen, setFullscreen];
}

function getBrowserFullscreenElementProp() {
  if (typeof document['fullscreenElement'] !== 'undefined') {
    return 'fullscreenElement';
  } if (typeof document['mozFullScreenElement'] !== 'undefined') {
    return 'mozFullScreenElement';
  } if (typeof document['msFullscreenElement'] !== 'undefined') {
    return 'msFullscreenElement';
  } if (typeof document['webkitFullscreenElement'] !== 'undefined') {
    return 'webkitFullscreenElement';
  }
  throw new Error('fullscreenElement is not supported by this browser');
}
