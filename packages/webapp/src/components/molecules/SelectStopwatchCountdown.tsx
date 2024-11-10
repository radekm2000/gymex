import { useEffect, useState } from "react";
import { useCountdown, useMediaQuery } from "usehooks-ts";
import { StopwatchIcon } from "../atoms/icons/StopwatchIcon";
import { restTimeOptions, RestTimeOptions } from "@gymex/commons/src";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const SelectStopwatchCountdown = () => {
  const [internalValue] = useState<number>(1000);
  const [restTime, setRestTime] = useState<RestTimeOptions>("60");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [stopwatchClicked, setStopwatchClicked] = useState(false);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: Number(restTime),
    intervalMs: internalValue,
  });
  useEffect(() => {
    resetCountdown();
    setStopwatchClicked(false);

    if (stopwatchClicked) {
      startCountdown();
      setStopwatchClicked(true);
    }
  }, [resetCountdown, setStopwatchClicked, startCountdown, stopwatchClicked]);

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
    <div className="flex flex-col items-center ">
      <div className="flex w-full">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Set timer</Button>
            <DropdownMenuContent side="bottom" align="start">
              {restTimeOptions.map((option) => (
                <DropdownMenuItem onClick={() => setRestTime(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <div className="ml-auto cursor-pointer">
          <StopwatchIcon
            height="64"
            width="64"
            clicked={stopwatchClicked}
            onClick={onStopwatchClick}
          />
        </div>
      </div>
      <div className="sticky">
        <span
          className={` ${isDesktop ? "text-extraLarge" : "text-veryLarge"} cursor-pointer text-center font-mono  `}
        >
          {count}
        </span>
      </div>
    </div>
  );
};
