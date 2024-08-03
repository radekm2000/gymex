import { Menu } from "lucide-react";

type Props = {
  toggleSheet: () => void;
};

export const HamburgerMenu = ({ toggleSheet }: Props) => {
  return (
    <button
      onClick={() => toggleSheet()}
      className="flex items-center justify-center rounded-full hover:bg-primary-light size-10"
    >
      <Menu className=" stroke-white" />
    </button>
  );
};
