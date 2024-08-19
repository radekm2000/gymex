import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type Props = {
  isDefault: boolean;
  setIsDefault: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsDefaultExerciseSelect = ({
  isDefault = false,
  setIsDefault,
}: Props) => {
    return (
        <div className="flex flex-col gap-2">
          <Label>Default exercise</Label>
          <Select
            value={String(isDefault)}
            onValueChange={(val) => setIsDefault(val === "true")}
          >
            <SelectTrigger>
              <SelectValue placeholder={isDefault ? "TRUE" : "FALSE"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"true"}>TRUE</SelectItem>
                <SelectItem value={"false"}>FALSE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
};
