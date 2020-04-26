import { useEffect, useState } from 'react';

export default function useDebounce(value, delay, cancel) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (cancel) return;
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, cancel]);

  return debouncedValue;
}
