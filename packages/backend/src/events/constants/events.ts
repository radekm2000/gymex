export enum WorkoutEvents {
  WorkoutFinished = 'WorkoutFinished',
}

export type WorkoutFinishedPayload = {
  userId: number;
  totalWeight: number;
  totalTrainingTimeInSecs: number;
  sessionAmount: number;
  maxWeight: number;
};
