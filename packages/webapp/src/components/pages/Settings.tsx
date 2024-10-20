import { Info, InfoIcon } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { NotAuthed } from "./NotAuthed";
import { Separator } from "../ui/separator";

export const Settings = () => {
  const { isAuthed } = useAuth();

  if (!isAuthed) {
    return <NotAuthed></NotAuthed>;
  }

  return (
    <Card>
      <CardTitle className="flex gap-3 mb-2">
        <div>
          <Info />
        </div>
        <span>Global settings</span>
      </CardTitle>
      <Separator className="mb-4" />
    </Card>
  );
};
