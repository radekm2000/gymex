import { LogOut } from "lucide-react";
import { UserAvatar } from "../../atoms/icons/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { logout } from "../../../api/requests/user";

type Props = {
  discordAvatarId: string;
  discordUserId: string;
};

export const DropdownUserAvatar = ({
  discordAvatarId,
  discordUserId,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          discordAvatarId={discordAvatarId}
          discordUserId={discordUserId}
        />
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={logout}>
            <LogOut />
            <span className="text-white font-display">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
