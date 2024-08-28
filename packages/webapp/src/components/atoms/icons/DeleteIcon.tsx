import { Trash2 } from "lucide-react";

type Props = {
  size?: string;
  mdSize?: string;
};

export const DeleteIcon = ({ size, mdSize }: Props) => {
  return (
    <Trash2 className={`size-${size} ${mdSize ? `md:size-${mdSize}` : ""}`} />
  );
};
