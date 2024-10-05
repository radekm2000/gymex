import { Injectable, Logger } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CreateMuscleDto } from './dto/muscles.dto';
import { MusclesTable } from 'src/db/schema/workout';

export type MuscleModel = typeof MusclesTable.$inferSelect;

@Injectable()
export class MusclesService {
  private readonly _logger = new Logger();

  constructor(private readonly drizzle: DrizzleService) {}

  public addMuscle = async (dto: CreateMuscleDto) => {
    return await this.drizzle.db
      .insert(MusclesTable)
      .values({
        name: dto.name,
      })
      .returning();
  };

  public insertMuscleByMuscleName = async () => {
    //base muscle names
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this._logger.log('inserting muscle names');
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
    await Promise.all(
      muscleNames.map(
        async (muscleName) =>
          await this.drizzle.db
            .insert(MusclesTable)
            .values({ name: muscleName as any })
            .onConflictDoNothing(),
      ),
    );
    this._logger.log('muscle names inserted');
  };
}
