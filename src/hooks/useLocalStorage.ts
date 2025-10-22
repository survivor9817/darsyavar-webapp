import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${keyName}":`, err);
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue;
      window.localStorage.setItem(keyName, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (err) {
      console.error(`Error setting localStorage key "${keyName}":`, err);
    }
  };

  return [storedValue, setValue];
};
