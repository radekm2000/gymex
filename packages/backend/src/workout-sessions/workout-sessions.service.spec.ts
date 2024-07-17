import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutSessionsService } from './workout-sessions.service';

describe('WorkoutSessionsService', () => {
  let service: WorkoutSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutSessionsService],
    }).compile();

    service = module.get<WorkoutSessionsService>(WorkoutSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
