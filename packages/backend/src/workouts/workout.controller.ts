import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
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
    // TODO
    //  if there was previous session fetch exercises from previous sesion
    return await this.workoutService.getAll();
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
  @Get('exercises/:exerciseId/generate-chart')
  async generateChartDataFor(
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Query('workoutPlanId') workoutPlanId?: string, // we cant parse pipe workoutPlanId if it is optional otherwise when we dont pass it into url we get error
    //     "message": "Validation failed (numeric string is expected)",
  ) {
    if (workoutPlanId) {
      return await this.workoutService.getChartModel(
        exerciseId,
        Number(workoutPlanId),
      );
    }
    return await this.workoutService.getChartModel(exerciseId);
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
    const workout = await this.workoutService.startWorkout(
      workoutPlanId,
      userId,
    );
    return workout;
  }

  @UseGuards(AccessTokenGuard)
  @Post(':workoutId/finish-workout')
  async finishWorkout(
    @Body() dto: CreateWorkoutWithExercisesDto,
    @Param('workoutId', ParseIntPipe) workoutPlanId: number,
    @CurrentUserId() userId: number,
  ) {
    const workout = await this.workoutService.finishWorkout(
      workoutPlanId,
      userId,
      dto,
    );

    return workout;
  }

  @UseGuards(AccessTokenGuard)
  @Get(':workoutPlanId/sessions')
  async getWorkoutSessionsOfCertainWorkoutPlan(
    @Param('workoutPlanId', ParseIntPipe) workoutPlanId: number,
  ) {
    return await this.workoutService.getSessionsByWorkoutPlan(workoutPlanId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':workoutId')
  async deleteWorkoutAlongWithSets(
    @Param('workoutId', ParseIntPipe) workoutPlanId: number,
    @CurrentUserId() userId: number,
  ) {
    return await this.workoutService.delete(workoutPlanId, userId);
  }
}
