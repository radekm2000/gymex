import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type Props = {
  label: string;
  inputValue: string;
  onInputValueChange: (value: string) => void;
};

export const LabeledInput = ({
  label,
  inputValue,
  onInputValueChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        autoComplete="off"
        spellCheck='false'
        value={inputValue}
        onChange={(e) => onInputValueChange(e.target.value)}
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};
