import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CreateMuscleDto } from './dto/muscles.dto';
import { MusclesTable } from 'src/db/schema/workout';

export type MuscleModel = typeof MusclesTable.$inferSelect;

@Injectable()
export class MusclesService {
  constructor(private readonly drizzle: DrizzleService) {}

  public addMuscle = async (dto: CreateMuscleDto) => {
    return await this.drizzle.db
      .insert(MusclesTable)
      .values({
        name: dto.name,
      })
      .returning();
  };

  public insertMuscleByMuscleName = async (muscleName: string) => {
    //base muscle names
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const muscleNames = [
      'chest',
      'back',
      'legs',
      'shoulders',
      'bicep',
      'triceps',
      'abs',
      'calves',
      'cardio',
      'butt',
      'forearm',
      'base',
    ];
    return await this.drizzle.db.insert(MusclesTable).values({
      name: muscleName as any,
    });
  };
}
