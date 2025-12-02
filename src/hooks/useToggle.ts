import { useState } from 'react';

export const useToggle = () => {
  const [isActive, setIsActive] = useState(false);

  const toggle = () => setIsActive((prev) => !prev);

  const onClose = () => setIsActive(false);

  const onOpen = () => setIsActive(true);

  return { isActive, onClose, onOpen, toggle };
};
