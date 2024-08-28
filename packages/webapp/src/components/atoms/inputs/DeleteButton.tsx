import { Button } from "../../ui/button";
import { DeleteIcon } from "../icons/DeleteIcon";

type Props = {
  onDelete: (id: number) => void;
  idToDelete: number;
  iconSize?: string;
  iconMdSize?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const DeleteButton = ({
  onDelete,
  idToDelete,
  iconSize,
  iconMdSize,
  ...props
}: Props) => {
  return (
    <Button
      {...props}
      variant={"destructive"}
      onClick={() => onDelete(idToDelete)}
    >
      <DeleteIcon size={iconSize} mdSize={iconMdSize} />
    </Button>
  );
};
