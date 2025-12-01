import { useCallback } from 'react';

import EventTypes from '../constants/EventTypes';
import useEventListener from './useEventListener';

interface UseEscapeKeyProps {
  enabled?: boolean;
  onEscape: () => void;
  preventDefault?: boolean;
}

const useEscapeKey = ({ onEscape, enabled = true, preventDefault = false }: UseEscapeKeyProps) => {
  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      if (event.key === EventTypes.ESCAPE) {
        if (preventDefault) {
          event.preventDefault();
          event.stopPropagation();
        }
        onEscape();
      }
    },
    [enabled, onEscape, preventDefault],
  );

  useEventListener('keydown', handler, document);
};

export default useEscapeKey;
