import { useEffect, useRef } from "react";
import type { EffectCallback, DependencyList } from "react";

export const useUpdateEffect = (effect: EffectCallback, deps: DependencyList): void => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
  }, deps);
};
