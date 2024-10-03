import { Module } from '@nestjs/common';
import { BadgeSyncHandler } from './handlers/update-badges';
import { UserService } from 'src/spi/user/user';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: BadgeSyncHandler,
      inject: [UserService],
      useFactory: (userService: UserService) => {
        return new BadgeSyncHandler(userService);
      },
    },
  ],
  exports: [BadgeSyncHandler],
})
export class SyncModule {}
