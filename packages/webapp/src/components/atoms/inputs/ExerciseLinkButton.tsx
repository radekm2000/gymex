import { ReactNode } from "react";
import { RoutePath } from "../../../constants/navigation";
import { useLocation } from "wouter";
import { Button } from "../../ui/button";

type Props = {
  icon?: ReactNode;
  name: string;
  path?: RoutePath;
};

export const ExerciseLinkButton = ({ icon, name, path }: Props) => {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col items-start ">
      <Button variant={'default'} className="w-32 h-32" onClick={() => path && setLocation(path)}>
        {icon}
      </Button>
      <span className="text-xl text-center text-white text font-display">
        {name}
      </span>
    </div>
  );
};
