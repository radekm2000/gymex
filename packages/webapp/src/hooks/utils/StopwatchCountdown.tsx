import { useEffect, useState } from "react";
import { useCountdown, useMediaQuery } from "usehooks-ts";
import { StopwatchIcon } from "../../components/atoms/icons/StopwatchIcon";

type Props = {
  restTimeValue: number;
};

export const StopwatchCountdown = ({ restTimeValue }: Props) => {
  const [internalValue, setInternalValue] = useState<number>(1000);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [stopwatchClicked, setStopwatchClicked] = useState(false);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: restTimeValue,
      intervalMs: internalValue,
    });

  useEffect(() => {
    if (count <= 0) {
      resetCountdown();
      setStopwatchClicked(false);
    }
  }, [count, resetCountdown]);
  const onStopwatchClick = () => {
    if (stopwatchClicked) {
      resetCountdown();
      setStopwatchClicked(false);
    } else {
      startCountdown();
      setStopwatchClicked(true);
    }
  };
  return (
    <div className="flex gap-4">
      <span className={`text-${isDesktop ? "3xl" : "l"}`}>{count}</span>
      <StopwatchIcon clicked={stopwatchClicked} onClick={onStopwatchClick} />
    </div>
  );
};
