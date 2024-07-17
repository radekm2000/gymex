import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutSessionsController } from './workout-sessions.controller';

describe('WorkoutSessionsController', () => {
  let controller: WorkoutSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutSessionsController],
    }).compile();

    controller = module.get<WorkoutSessionsController>(
      WorkoutSessionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
