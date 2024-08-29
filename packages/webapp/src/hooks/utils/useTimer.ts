import { useCallback, useEffect, useState } from "react";

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setSeconds(0);
    setIsActive(true);
  }, []);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prevSecs) => prevSecs + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  return { formattedTime: formatTime(seconds), stop, reset };
};
