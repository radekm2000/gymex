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
          className="h-full text-white border-r border-none bg-primary min-w-[200px] w-[200px] "
          side={"left"}
        >
          <SheetDescription>
            <SidebarLinks />
          </SheetDescription>
        </SheetContent>
      </SheetTrigger>
    </Sheet>
  );
};
