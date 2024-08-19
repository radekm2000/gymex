import React from "react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { RestTimeOptions, restTimeOptions } from "@gymex/commons/src";

type Props = {
  restTime: string;
  setRestTime: React.Dispatch<React.SetStateAction<RestTimeOptions>>;
};

export const RestTimeSelect = ({ restTime = "60", setRestTime }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Rest time</Label>
      <Select
        value={restTime}
        onValueChange={(val) => setRestTime(val as RestTimeOptions)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select primary muscle" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {restTimeOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
