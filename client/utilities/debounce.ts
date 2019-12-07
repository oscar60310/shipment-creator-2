import { useRef, useEffect } from 'react';

export const useDebounce = (func: () => void, wait: number) => {
  const timeout = useRef(null);

  const trigger = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    timeout.current = setTimeout(func, wait);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return trigger;
};
