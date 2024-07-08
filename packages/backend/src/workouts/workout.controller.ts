import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { WorkoutService } from 'src/spi/workout/workout';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { CreateWorkoutDto, CreateWorkoutDtoSchema } from './dto/workout.dto';
import { AccessTokenGuard } from 'src/auth/utils/AccessTokenGuard';
import { CurrentUserId } from 'src/users/decorators/user.decorator';
import { WorkoutModel } from './types/workout.types';

@Controller('workout')
export class WorkoutController {
  constructor(
    @Inject(WorkoutService) private readonly workoutService: WorkoutService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateWorkoutDtoSchema))
  async create(
    @Body() dto: CreateWorkoutDto,
    @CurrentUserId() userId: number,
  ): Promise<void> {
    const workoutPlan = await this.workoutService.createWorkout(dto, userId);
    return await this.addExercisesToWorkout(userId, workoutPlan.id);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':workoutId/exercises')
  async addExercisesToWorkout(
    @CurrentUserId() userId: number,
    @Param('workoutId', ParseIntPipe) workoutPlanId?: number,
  ) {
    return await this.workoutService.addExercisesToWorkout(
      workoutPlanId,
      userId,
    );
  }
}
