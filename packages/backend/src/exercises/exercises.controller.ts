import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/utils/AccessTokenGuard';
import { ExerciseService } from 'src/spi/exercise/exercise';
import { CurrentUserId } from 'src/users/decorators/user.decorator';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import {
  CreateExerciseDto,
  CreateExerciseDtoSchema,
} from './dto/exercises.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(
    @Inject(ExerciseService) private readonly exerciseService: ExerciseService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @UsePipes(new ZodValidationPipe(CreateExerciseDtoSchema))
  @Post()
  async create(
    @Body() dto: CreateExerciseDto,
    @CurrentUserId() userId: number,
  ) {
    return await this.exerciseService.create(dto, userId);
  }
}
