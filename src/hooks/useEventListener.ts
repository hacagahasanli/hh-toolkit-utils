import { useEffect } from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | Document = window,
) {
  useEffect(() => {
    element.addEventListener(event, handler as EventListener);
    return () => element.removeEventListener(event, handler as EventListener);
  }, [event, handler, element]);
}
