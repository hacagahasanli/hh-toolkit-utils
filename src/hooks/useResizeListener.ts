import { useEffect } from 'react';

import EventTypes from '../constants/EventTypes';

export const useResizeListener = (callback: () => void, active: boolean) => {
  useEffect(() => {
    if (active) {
      callback();
      window.addEventListener(EventTypes.RESIZE, callback);
    }

    return () => {
      window.removeEventListener(EventTypes.RESIZE, callback);
    };
  }, [active, callback]);
};
