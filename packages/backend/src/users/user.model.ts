import {
  DetailedUserModel,
  UserDiscordModel,
  UserMetricsModel,
  UserModel,
  UserStatsModel,
} from './user.types';

export class User {
  constructor(
    private readonly _model: UserModel,
    private readonly _metrics?: UserMetricsModel,
    private readonly _discordConnection?: UserDiscordModel,
    private readonly _stats?: UserStatsModel,
  ) {}

  public static from = (
    model: UserModel,
    metrics?: UserMetricsModel,
    discordConnection?: UserDiscordModel,
    stats?: UserStatsModel,
  ) => new User(model, metrics, discordConnection, stats);

  public get model(): UserModel {
    return this._model;
  }

  public get metrics(): UserMetricsModel {
    return this._metrics;
  }

  public get discordConnection(): UserDiscordModel {
    return this._discordConnection;
  }

  public get stats(): UserStatsModel {
    return this._stats;
  }
  public get detailedUserModel(): DetailedUserModel {
    return {
      user: {
        id: this._model.id,
        createdAt: this._model.createdAt,
        username: this._model.username,
        role: this._model.role ?? 'User',
      },
      discordConnection: this._discordConnection
        ? {
            accessToken: this._discordConnection.accessToken,
            avatar: this._discordConnection.avatar,
            discordId: this._discordConnection.discordId,
            username: this._discordConnection.username,
          }
        : null,
      metrics: this._metrics
        ? {
            height: this._metrics.height,
            weight: this._metrics.weight,
          }
        : null,
      stats: this._stats ? this._stats : null,
    };
  }
}
