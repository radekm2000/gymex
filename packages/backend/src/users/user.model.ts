import {
  DetailedUserModel,
  UserDiscordModel,
  UserMetricsModel,
  UserModel,
} from './user.types';

export class User {
  constructor(
    private readonly _model: UserModel,
    private readonly _metrics?: UserMetricsModel,
    private readonly _discordConnection?: UserDiscordModel,
  ) {}

  public static from = (
    model: UserModel,
    metrics?: UserMetricsModel,
    discordConnection?: UserDiscordModel,
  ) => new User(model, metrics, discordConnection);

  public get model(): UserModel {
    return this._model;
  }

  public get metrics(): UserMetricsModel {
    return this._metrics;
  }

  public get discordConnection(): UserDiscordModel {
    return this._discordConnection;
  }

  public get detailedUserModel(): DetailedUserModel {
    return {
      user: {
        id: this._model.id,
        createdAt: this._model.createdAt,
        username: this._model.username,
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
    };
  }
}
