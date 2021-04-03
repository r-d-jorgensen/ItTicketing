import { useState, useEffect } from 'react';

export default function useStorage(key, storageType = 'local') {
  const [value, setValue] = useState(() => {
    try {
      if (storageType === 'local') {
        return JSON.parse(localStorage.getItem(key));
      // eslint-disable-next-line no-else-return
      } else if (storageType === 'session') {
        return JSON.parse(sessionStorage.getItem(key));
      }
      return null;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      return null;
    }
  });

  useEffect(() => {
    if (storageType === 'local') {
      localStorage.setItem(key, JSON.stringify(value));
    } else if (storageType === 'session') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, storageType, value]);

  return [value, setValue];
}
