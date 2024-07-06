import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/utils/AccessTokenGuard';
import { UsersTable } from 'src/db/schema/users';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CurrentUserId } from './decorators/user.decorator';
import { DetailedUserModel, UserModel } from './user.types';
import { UserService } from 'src/spi/user/user';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(DrizzleService) private readonly drizzleService: DrizzleService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return await this.drizzleService.db.select().from(UsersTable);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/me')
  async getCurrentUserInfo(
    @CurrentUserId() userId: number,
  ): Promise<DetailedUserModel> {
    return await this.userService.getDetailedUserInfo(userId);
  }
}
