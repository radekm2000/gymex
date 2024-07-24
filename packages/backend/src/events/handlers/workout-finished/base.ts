import { Logger } from '@nestjs/common';

export abstract class WorkoutFinishedEventEventHandlerBase {
  private readonly _logger = new Logger(
    WorkoutFinishedEventEventHandlerBase.name,
  );

  public abstract name: string;

  protected async handleSafely(fn: () => Promise<void>) {
    try {
      await fn();
    } catch (error) {
      console.log(error);
      this._logger.error(
        { error },
        `${this.name} Error when handling WorkoutFinishedEvent`,
      );
    }
  }
}
