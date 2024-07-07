import {
  Body,
  Controller,
  Inject,
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
  ): Promise<WorkoutModel> {
    return await this.workoutService.createWorkout(dto, userId);
  }
}
