import { useState } from "react";
import { Card, CardTitle } from "../ui/card";
import { Info, SaveIcon } from "lucide-react";
import { LabeledInput } from "../atoms/inputs/LabeledInput";
import { PrimaryButton } from "../atoms/inputs/PrimaryButton";

export const AddTrainingPlan = () => {
  const [trainingPlanName, setTrainingPlanName] = useState("");
  return (
    <Card className="flex flex-col gap-2">
      <CardTitle className="flex gap-4">
        <Info />
        <span>Add plan</span>
        <div className="ml-auto">
          <PrimaryButton
            tooltipMessage="Add plan name and exercises"
            disabled={!trainingPlanName}
            buttonMessage="SAVE"
            buttonIcon={<SaveIcon />}
          />
        </div>
      </CardTitle>
      <div className="gap-4 pt-3">
        <LabeledInput
          label="Training plan name"
          inputValue={trainingPlanName}
          onInputValueChange={setTrainingPlanName}
        />
      </div>
    </Card>
  );
};
