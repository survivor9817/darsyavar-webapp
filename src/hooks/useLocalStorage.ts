import { useState } from "react";

type SetValue<T> = (newValue: T | ((prevValue: T) => T)) => void;
type UseLocalStorageReturn<T> = [T, SetValue<T>];

export const useLocalStorage = <T>(keyName: string, defaultValue: T): UseLocalStorageReturn<T> => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${keyName}":`, err);
      return defaultValue;
    }
  });

  // function setValue(newValue) {
  const setValue: SetValue<T> = (newValue) => {
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
