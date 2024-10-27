import { Input, InputProps } from "../../ui/input";

type Props = {
  value: string | number;
} & InputProps;

export const InsertWorkoutStatsInput = ({ value, ...props }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    } else if (
      ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      return;
    } else if (
      isNaN(Number(e.key)) ||
      e.key === " " ||
      e.key === "189" ||
      e.key === "69" ||
      (value.toString().length < 1 && e.key === "0")
    ) {
      e.preventDefault();
    }
  };

  return (
    <Input type="number" value={value} {...props} onKeyDown={handleKeyDown} />
  );
};
