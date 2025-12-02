import { useLocation } from 'react-router-dom';

export const useAppLocation = () => {
  const location = useLocation();

  const { pathname, hash, search } = location ?? {};

  const isActive = (path: string) => pathname === path;

  const includes = (segment: string) => pathname.includes(segment);

  const startsWith = (prefix: string) => pathname.startsWith(prefix);

  return {
    hash,
    search,
    isActive,
    includes,
    pathname,
    startsWith,
  };
};
