import {
  Body,
  Controller,
  Get,
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

@Controller('workouts')
export class WorkoutController {
  constructor(
    @Inject(WorkoutService) private readonly workoutService: WorkoutService,
  ) {}

  @Get()
  async getAllWorkouts() {
    return this.workoutService.getAll();
  }

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

  @UseGuards(AccessTokenGuard)
  @Post(':workoutId/start-workout')
  async startWorkout(
    @CurrentUserId() userId: number,
    @Param('workoutId', ParseIntPipe) workoutPlanId: number,
  ) {
    return await this.workoutService.startWorkout(workoutPlanId, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':workoutId/finish-workout')
  async finishWorkout(
    @Body() dto: CreateWorkoutWithExercisesDto,
    @Param('workoutId', ParseIntPipe) workoutPlanId: number,
    @CurrentUserId() userId: number,
  ) {
    return await this.workoutService.finishWorkout(workoutPlanId, userId, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':workoutPlanId/sessions')
  async getWorkoutSessionsOfCertainWorkoutPlan(
    @Param('workoutPlanId', ParseIntPipe) workoutPlanId: number,
  ) {
    return this.workoutService.getSessionsByWorkoutPlan(workoutPlanId);
  }
}
