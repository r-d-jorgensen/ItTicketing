import { useState, useEffect } from 'react';

export default function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
