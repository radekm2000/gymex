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
import {
  CreateWorkoutWithExercisesDto,
  CreateWorkoutWithExercisesDtoSchema,
} from './dto/workout.dto';
import { AccessTokenGuard } from 'src/auth/utils/AccessTokenGuard';
import { CurrentUserId } from 'src/users/decorators/user.decorator';
import { DetailedWorkoutModel } from './types/workout.types';
import {
  AddExerciseToWorkoutDto,
  AddExerciseToWorkoutDtoSchema,
} from 'src/exercises/dto/exercises.dto';

@Controller('workout')
export class WorkoutController {
  constructor(
    @Inject(WorkoutService) private readonly workoutService: WorkoutService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateWorkoutWithExercisesDtoSchema))
  async create(
    @Body() dto: CreateWorkoutWithExercisesDto,
    @CurrentUserId() userId: number,
  ): Promise<DetailedWorkoutModel> {
    return await this.workoutService.createWorkoutWithExercises(dto, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':workoutId/exercises')
  @UsePipes(new ZodValidationPipe(AddExerciseToWorkoutDtoSchema))
  async addExercisesToWorkout(
    @Body() dto: AddExerciseToWorkoutDto,
    @CurrentUserId() userId: number,
    @Param('workoutId', ParseIntPipe) workoutPlanId: number,
  ): Promise<DetailedWorkoutModel> {
    return await this.workoutService.addExercisesToWorkout(
      workoutPlanId,
      userId,
      dto,
    );
  }
}
