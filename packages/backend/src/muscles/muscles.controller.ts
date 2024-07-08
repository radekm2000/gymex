import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';
import { CreateMuscleDto, CreateMuscleDtoSchema } from './dto/muscles.dto';
import { MusclesService } from './muscles.service';

@Controller('muscles')
export class MusclesController {
  constructor(private readonly muscleService: MusclesService) {}

  @UsePipes(new ZodValidationPipe(CreateMuscleDtoSchema))
  @Post()
  async addMuscle(@Body() dto: CreateMuscleDto) {
    return await this.muscleService.addMuscle(dto);
  }
}
