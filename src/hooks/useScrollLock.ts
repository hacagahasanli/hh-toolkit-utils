import { useEffect } from 'react';

interface UseBodyScrollOptions {
  isLocked: boolean;
}

export const useScrollLock = ({ isLocked }: UseBodyScrollOptions) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLocked]);
};
