import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/utils/AccessTokenGuard';
import { ExerciseService } from 'src/spi/exercise/exercise';
import {
  CurrentUserId,
  CurrentUserRole,
} from 'src/users/decorators/user.decorator';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import {
  CreateExerciseDto,
  CreateExerciseDtoSchema,
} from './dto/exercises.dto';
import { RoleGuard, UserRoles } from 'src/auth/utils/RoleGuard';

@Controller('exercises')
export class ExercisesController {
  constructor(
    @Inject(ExerciseService) private readonly exerciseService: ExerciseService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @UseGuards(RoleGuard([UserRoles.Admin, UserRoles.User]))
  @UsePipes(new ZodValidationPipe(CreateExerciseDtoSchema))
  @Post()
  async create(
    @Body() dto: CreateExerciseDto,
    @CurrentUserId() userId: number,
    @CurrentUserRole() role: UserRoles.Admin | UserRoles.User,
  ) {
    return await this.exerciseService.create(dto, userId, role);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getExercises() {
    return await this.exerciseService.getAll();
  }
}
