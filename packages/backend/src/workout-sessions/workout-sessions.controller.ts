import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WorkoutSessionsService } from './workout-sessions.service';

@Controller('workout-sessions')
export class WorkoutSessionsController {
  constructor(
    private readonly workoutSessionsService: WorkoutSessionsService,
  ) {}

  @Get(':workoutPlanId/sessions')
  async getWorkoutSessionsByWorkoutPlanId(
    @Param('workoutPlanId', ParseIntPipe) workoutPlanId: number,
  ) {
    return await this.workoutSessionsService.getWorkoutSessionsByWorkoutPlanId(
      workoutPlanId,
    );
  }
}
