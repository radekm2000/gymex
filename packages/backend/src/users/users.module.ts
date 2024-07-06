import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UserService } from 'src/spi/user/user';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UserService,
      inject: [DrizzleService],
      useFactory: (drizzleService: DrizzleService): UserService => {
        return new UsersService(drizzleService);
      },
    },
  ],
  exports: [UserService],
})
export class UsersModule {}
