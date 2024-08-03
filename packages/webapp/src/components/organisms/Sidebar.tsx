import { DesktopSidebar } from "../molecules/DesktopSidebar";
import { useMediaQuery } from "usehooks-ts";
import { MobileSidebar } from "../molecules/MobileSidebar";

type Props = {
  open: boolean;
  onOpenChange: () => void;
};

export const Sidebar = ({ open, onOpenChange }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DesktopSidebar />;
  } else {
    return <MobileSidebar open={open} onOpenChange={onOpenChange} />;
  }
};
