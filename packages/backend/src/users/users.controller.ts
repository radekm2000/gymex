import {
  Body,
  Controller,
  Get,
  Inject,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/utils/AccessTokenGuard';
import { UsersTable } from 'src/db/schema/users';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CurrentUserId } from './decorators/user.decorator';
import { DetailedUserModel, UserModel } from './user.types';
import { UserService } from 'src/spi/user/user';
import { UpdateUserDto, UpdateUserDtoSchema } from './dto/users.dto';
import { ZodValidationPipe } from 'src/utils/pipes/ZodValidationPipe';

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
    return await this.userService.getDetailedUserModelFor(userId);
  }

  @Get('/leaderboard')
  async getLeaderboardInfo(): Promise<DetailedUserModel[]> {
    return await this.userService.getLeaderboardInfo();
  }

  @UsePipes(new ZodValidationPipe(UpdateUserDtoSchema))
  @UseGuards(AccessTokenGuard)
  @UsePipes()
  @Put(':userId')
  async updateFirstTimeUserMetrics(
    @CurrentUserId() userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    // user is logged in first time if rows in metrics table are not defined
    return await this.userService.updateUserMetricsAndOptionalUsername(
      userId,
      dto,
    );
  }
}
