import { Info } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { Card, CardTitle } from "../ui/card";
import { NotAuthed } from "./NotAuthed";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { useSettingsStore } from "../../hooks/utils/useSettingsStore";

export const Settings = () => {
  const { isAuthed, user } = useAuth();
  const userMetrics = user.model.metrics;

  const { showCheckboxesInSets, toggleSetCheckboxes } = useSettingsStore();

  if (!isAuthed) {
    return <NotAuthed></NotAuthed>;
  }

  return (
    <Card className="flex flex-col gap-2">
      <CardTitle className="flex gap-4">
        <div>
          <Info />
        </div>
        <span>Global settings</span>
      </CardTitle>
      <Separator className="" />

      <div className="flex flex-col font-display">
        <span className="text-3xl text-secondary-veryLight">Metrics</span>
        <div className="flex flex-col">
          <span>
            Height: {userMetrics.height !== "" ? userMetrics.height : "unknown"}
          </span>
          <span>
            Weight: {userMetrics.weight !== "" ? userMetrics.weight : "unknown"}
          </span>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col ">
        <span className="text-3xl text-secondary-veryLight">
          Workout settings
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 text-xl">
            <span>Enable checkboxes for sets in workouts</span>
            <Checkbox
              checked={showCheckboxesInSets}
              onClick={() => toggleSetCheckboxes()}
            />
          </div>
          <span className="text-secondary-customGray">
            This option will allow in training sessions toggling sets if they
            are finished or not, finished ones will be higlighted on green
          </span>
          <span className="text-secondary-customGray opacity-80">
            (only checked off sets will be included in session)
          </span>
        </div>
      </div>
      <Separator />
    </Card>
  );
};
