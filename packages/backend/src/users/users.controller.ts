import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/utils/AccessTokenGuard';
import { UsersTable } from 'src/db/schema/users';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CurrentUserId } from './decorators/user.decorator';
import { DetailedUserModel, UserModel } from './model';
import { SomeUserService, UserService } from 'src/spi/user/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(DrizzleService) private readonly drizzleService: DrizzleService,
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getUsers(@CurrentUserId() userId: number): Promise<UserModel[]> {
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
