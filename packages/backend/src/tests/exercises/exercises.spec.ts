import { HttpException } from '@nestjs/common';
import { ExercisesService } from 'src/exercises/exercises.service';
import { ExerciseModel } from 'src/workouts/types/workout.types';
describe('ExercisesService', () => {
  const exerciseId = 2;
  const userId = 1;

  const exerciseMock: ExerciseModel = {
    exerciseName: 'exercise1',
    id: exerciseId,
    isCreatorDeveloper: false,
    isDefault: false,
    notes: '',
    primaryMuscleTargeted: 'abs',
    restTime: '60',
    userId,
  };

  let drizzleService: any;
  let exerciseService: ExercisesService;

  beforeEach(() => {
    drizzleService = {
      db: {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockResolvedValue([exerciseMock]),
      },
    };

    exerciseService = new ExercisesService(drizzleService);
  });

  it('should return the exercise by ID', async () => {
    const result = await exerciseService.findExerciseById(exerciseId);
    expect(result).toEqual(exerciseMock);
  });

  it('should throw an exception if exercise not found', async () => {
    // Override the mock to return an empty array
    drizzleService.db.where.mockResolvedValue([]);

    await expect(exerciseService.findExerciseById(exerciseId)).rejects.toThrow(
      HttpException,
    );
    await expect(exerciseService.findExerciseById(exerciseId)).rejects.toThrow(
      'Exercise not found',
    );
  });
});
