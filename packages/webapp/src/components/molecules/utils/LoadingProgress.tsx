import { useEffect, useState } from "react";
import { LoadingIcon } from "../../atoms/icons/LoadingIcon";

export const LoadingProgress = () => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDisplay(true), 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin">
        <LoadingIcon />
      </div>
    </div>
  );
};
