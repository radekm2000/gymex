import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export type DrizzleSchema = Record<string, unknown>;
export type DrizzleDb = NodePgDatabase<DrizzleSchema>;
@Injectable()
export class DrizzleService {
  private readonly logger = new Logger(DrizzleService.name);

  public readonly db: DrizzleDb;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    this.db = drizzle(
      new Pool({
        connectionString: this.config.getOrThrow('PG_CONNECTION_STRING'),

        idleTimeoutMillis: 15_000,
        max: 256,
      }),
    );
  }

  public runMigrations = async () => {
    this.logger.log('Running migrations');

    await migrate(this.db, {
      migrationsFolder: 'src/db/migrations',
    });
    this.logger.log('Migrations finished');
  };
}
