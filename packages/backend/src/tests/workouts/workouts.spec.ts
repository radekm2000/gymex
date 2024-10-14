import { WorkoutsService } from 'src/workouts/workout.service';

describe('createWorkoutWithExercises method', () => {
  const eventEmitter = {} as any;
  const drizzleService = {} as any;
  const workoutSessionsService = {} as any;
  const exerciseService = {} as any;
  it('should create workout plan with exercises', async () => {});

  const workoutService = new WorkoutsService(
    drizzleService,
    workoutSessionsService,
    eventEmitter,
    exerciseService,
  );

  const x = 2 + 2;

  expect(x).toEqual(4);
});
