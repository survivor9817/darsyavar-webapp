import { useState, useEffect } from "react";

export const useLocalStorageEverywhere = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error(`Error reading localStorage key "${keyName}":`, err);
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      // پشتیبانی از function مثل useState معمولی
      const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue;

      window.localStorage.setItem(keyName, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (err) {
      console.error(`Error setting localStorage key "${keyName}":`, err);
    }
  };

  // گوش دادن به تغییرات localStorage از تب‌های دیگر
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === keyName && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (err) {
          console.error(`Error parsing localStorage key "${keyName}":`, err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [keyName]);

  return [storedValue, setValue];
};
