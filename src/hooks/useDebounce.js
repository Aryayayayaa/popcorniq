import { useEffect, useState } from "react";
import { DEBOUNCE_DELAY } from "../constants/movie";

function useDebounce(value, delay = DEBOUNCE_DELAY) {
  //value = searchQuery/input entered by user
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
