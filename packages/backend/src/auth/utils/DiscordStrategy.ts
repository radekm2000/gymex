import { PassportStrategy } from '@nestjs/passport';
import {
  InternalOAuthError,
  Strategy,
  StrategyOptions,
} from 'passport-discord';
import 'dotenv/config';
import { AuthService } from '../auth.service';
import { DiscordProfile, DiscordProfileSchema } from 'src/users/dto/users.dto';
import { Injectable } from '@nestjs/common';

const AUTHORIZATION_URL = 'https://discord.com/oauth2/authorize';
const TOKEN_URL = 'https://discord.com/api/oauth2/token';
const PROFILE_URL = 'https://discord.com/api/users/@me';

type UserProfileCallback = (err?: Error | null, profile?: any) => void;
type VerifyCallback = (err?: Error | null, user?: Express.User) => void;

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      tokenURL: TOKEN_URL,
      callbackURL:
        process.env.IS_DEV == 'true'
          ? process.env.DEVELOPMENT_CALLBACK_URL
          : process.env.PROD_CALLBACK_URL,
      authorizationURL: AUTHORIZATION_URL,
      scope: ['identify', 'guilds'],
    } satisfies StrategyOptions);
  }

  public validate = async (
    accesToken: string,
    refreshToken: string,
    profile: DiscordProfile,
    done: VerifyCallback,
  ) => {
    try {
      const user = await this.authService.createOrGetUser(profile);
      return done(null, user as unknown as Express.User);
    } catch (error) {
      return done(error);
    }
  };

  public userProfile = async (
    accessToken: string,
    done: UserProfileCallback,
  ) => {
    this._oauth2.get(PROFILE_URL, accessToken, (err, body) => {
      if (err || !body) {
        return done(
          new InternalOAuthError('Error when fetching user profile', err),
        );
      }
      try {
        const parsedBody = JSON.parse((body ?? '').toString());
        return done(null, DiscordProfileSchema.parse(parsedBody));
      } catch (error) {
        return done(new Error('Failed when parsing discord profile'));
      }
    });
  };
}
