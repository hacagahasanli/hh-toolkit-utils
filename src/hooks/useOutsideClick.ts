import { type RefObject, useCallback } from 'react';
import useEventListener from './useEventListener';

function useOutsideClick(ref: RefObject<HTMLElement | null>, onClickOutside?: () => void) {
  const handler = useCallback(
    (event: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        onClickOutside?.();
      }
    },
    [ref, onClickOutside],
  );

  useEventListener('mousedown', handler, document);
}

export default useOutsideClick;
