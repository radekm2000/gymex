import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import { SidebarLinks } from "../molecules/SidebarLinks";

type Props = {
  open: boolean;
  onOpenChange: () => void;
};

export const MobileSidebar = ({ open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <SheetContent
          hideClose={true}
          className="h-full p-0 text-white border-r border-none w-min bg-primary-dark"
          side={"left"}
        >
          <SheetDescription className="h-full">
            <SidebarLinks />
          </SheetDescription>
        </SheetContent>
      </SheetTrigger>
    </Sheet>
  );
};
