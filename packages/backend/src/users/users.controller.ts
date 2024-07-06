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
import { UserModel } from './model';
import { SomeUserService, UserService } from 'src/spi/user/user';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(DrizzleService) private readonly drizzleService: DrizzleService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getUsers(@CurrentUserId() userId: number): Promise<UserModel[]> {
    return await this.drizzleService.db.select().from(UsersTable);
  }

  @Get('me')
  async getCurrentUserInfo(@Param('id', ParseIntPipe) userId: number) {
    return;
  }
}
