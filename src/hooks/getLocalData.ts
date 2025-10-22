export function getLocalData(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? +JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return defaultValue;
  }
}
