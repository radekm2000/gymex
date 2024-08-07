import { Info } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
export const AddExercise = () => {
  const [exerciseName, setExerciseName] = useState("");
  console.log(exerciseName);
  return (
    <Card>
      <CardTitle className="flex gap-4">
        <Info />
        Add exercise
      </CardTitle>
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="exercise-name">Exercise name</Label>
          <Input
            spellCheck={false}
            onChange={(e) => setExerciseName(e.target.value)}
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            type="exercise-name"
            id="exercise-name"
          />
        </div>
      </div>
    </Card>
  );
};
