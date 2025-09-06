import { useState, useEffect } from 'react';

// Fix: Update hook signature to allow a function for lazy initialization of initialValue, and remove trailing comma in generic.
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Fix: Correctly resolve initial value if it's a function.
    const resolvedInitialValue = initialValue instanceof Function ? initialValue() : initialValue;

    if (typeof window === 'undefined') {
      return resolvedInitialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : resolvedInitialValue;
    } catch (error) {
      console.error(error);
      return resolvedInitialValue;
    }
  });

  useEffect(() => {
    try {
      // Fix: The previous logic was incorrect if the stored value itself was a function.
      // `storedValue` should be stringified directly.
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
