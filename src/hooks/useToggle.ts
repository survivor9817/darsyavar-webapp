import { useState, useCallback } from "react";

export type UseToggleReturn = [boolean, () => void, () => void, () => void];

function useToggle(defaultValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
}

export default useToggle;
