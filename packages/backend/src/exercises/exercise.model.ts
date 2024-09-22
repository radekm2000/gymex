export type UpdateExerciseStatsDto = {
  userId: number;
  exerciseId: number;
  totalWeight: number;
  totalSets: number;
  totalReps: number;
  maxWeight: number;
  finishedAt: Date;
};

export type ExerciseOverallStats = {
  overallTotalWeight: number;
  overallTotalSets: number;
  overallTotalReps: number;
  overallMaxWeight: number;
};

export type ExerciseHistory = Omit<
  UpdateExerciseStatsDto,
  'exerciseId' | 'userId'
>[];

export class Exercise {
  private _maxWeight: number = 0;
  private _finishedAt: Date;
  private _totalWeight: number = 0;
  private _totalSets: number = 0;
  private _totalReps: number = 0;

  constructor(
    private readonly _exerciseId: number,
    private readonly userId: number,
    private readonly _history: ExerciseHistory,
  ) {}

  public static from = (
    userId: number,
    exerciseId: number,
    history: ExerciseHistory,
  ) => new Exercise(exerciseId, userId, history);

  public get history() {
    return this._history;
  }

  set maxWeight(weight: number) {
    if (weight > this._maxWeight) {
      this._maxWeight = weight;
    }
  }

  public mapHistoryToOverallStats(
    history: ExerciseHistory,
  ): ExerciseOverallStats {
    return {
      overallTotalReps: history.reduce(
        (acc, record) => acc + record.totalReps,
        0,
      ),
      overallTotalSets: history.reduce(
        (acc, record) => acc + record.totalSets,
        0,
      ),

      overallTotalWeight: history.reduce(
        (acc, record) => acc + record.totalWeight,
        0,
      ),
      overallMaxWeight: Math.max(...history.map((record) => record.maxWeight)),
    };
  }

  public updateStats(dto: UpdateExerciseStatsDto) {
    if (dto.exerciseId === this._exerciseId && dto.userId === this.userId) {
      this._history.push({
        totalWeight: dto.totalWeight,
        totalSets: dto.totalSets,
        totalReps: dto.totalReps,
        maxWeight: dto.maxWeight,
        finishedAt: dto.finishedAt,
      });

      this._maxWeight = Math.max(this._maxWeight, dto.maxWeight);
      this._totalReps += dto.totalReps;
      this._totalWeight += dto.totalWeight;
      this._totalSets += dto.totalSets;
      this._finishedAt = dto.finishedAt;
    }
  }
}
