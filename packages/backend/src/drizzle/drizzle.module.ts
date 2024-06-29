import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  exports: [DrizzleService],
  imports: [DrizzleModule, ConfigModule],
  providers: [
    {
      provide: DrizzleService,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const drizzle = new DrizzleService(config);
        await drizzle.runMigrations();
        return drizzle;
      },
    },
  ],
})
export class DrizzleModule {}
