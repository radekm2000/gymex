import { PrimaryMuscleTargeted } from "@gymex/commons/src";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { formatStringToFirstLetterUpperCase } from "../../../hooks/utils/formatStringToFirstLetterUperCase";

type Props = {
  primaryMuscleTargeted: PrimaryMuscleTargeted;
  setPrimaryMuscleTargeted: React.Dispatch<
    React.SetStateAction<PrimaryMuscleTargeted>
  >;
};

const primaryMuscleOptions: PrimaryMuscleTargeted[] = [
  "chest",
  "back",
  "legs",
  "shoulders",
  "bicep",
  "triceps",
  "abs",
  "calves",
  "cardio",
  "butt",
  "forearm",
  "base",
];

export const PrimaryMuscleSelect = ({
  setPrimaryMuscleTargeted,
  primaryMuscleTargeted,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Primary muscle</Label>
      <Select
        value={primaryMuscleTargeted}
        onValueChange={(val) =>
          setPrimaryMuscleTargeted(val as PrimaryMuscleTargeted)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select primary muscle" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {primaryMuscleOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                {formatStringToFirstLetterUpperCase(option)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
